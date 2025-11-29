package com.example.backend.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret:ChangeThisSecretForProd1234567890}")
    private String secret;

    @Value("${jwt.expiration-ms:86400000}") // 24h
    private long expirationMs;

    private Key getSigningKey() {
        try {
            byte[] keyBytes;
            // try decode as base64
            try {
                keyBytes = Decoders.BASE64.decode(secret);
            } catch (Exception ex) {
                keyBytes = secret.getBytes(java.nio.charset.StandardCharsets.UTF_8);
            }

            // ensure at least 256 bits (32 bytes). If shorter, derive a 256-bit key via SHA-256 of the secret
            if (keyBytes.length < 32) {
                java.security.MessageDigest md = java.security.MessageDigest.getInstance("SHA-256");
                keyBytes = md.digest(secret.getBytes(java.nio.charset.StandardCharsets.UTF_8));
            }

            return Keys.hmacShaKeyFor(keyBytes);
        } catch (java.security.NoSuchAlgorithmException e) {
            throw new RuntimeException("Failed to create signing key", e);
        }
    }

    public String generateToken(String username, String role) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public java.util.Map<String, Object> parseClaims(String token) {
        // return a plain Map to avoid direct type dependency on io.jsonwebtoken.Claims
        Object body = Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
        if (body instanceof java.util.Map) {
            return (java.util.Map<String, Object>) body;
        }
        return java.util.Collections.emptyMap();
    }

    public boolean isTokenValid(String token, String username) {
        try {
            java.util.Map<String, Object> claims = parseClaims(token);
            Object subObj = claims.get("sub");
            String sub = subObj != null ? subObj.toString() : null;
            Object expObj = claims.get("exp");
            // exp may be a Number (seconds) or Date depending on impl; handle common cases
            if (sub == null || !sub.equals(username) || expObj == null) {
                return false;
            }
            long nowMs = new Date().getTime();
            long expMs;
            if (expObj instanceof Number) {
                // jjwt may return seconds or milliseconds; normalize: if value seems in seconds, convert
                long v = ((Number) expObj).longValue();
                expMs = (v > 1_000_000_000_000L) ? v : v * 1000L;
            } else if (expObj instanceof Date) {
                expMs = ((Date) expObj).getTime();
            } else {
                try {
                    expMs = Long.parseLong(expObj.toString());
                    expMs = (expMs > 1_000_000_000_000L) ? expMs : expMs * 1000L;
                } catch (Exception ex) {
                    return false;
                }
            }
            return expMs > nowMs;
        } catch (Exception e) {
            return false;
        }
    }

}
