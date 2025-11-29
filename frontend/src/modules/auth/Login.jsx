import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center 
                 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500
                 p-4"
    >
      {/* Glass card */}
      <div
        className="bg-white/20 backdrop-blur-xl border border-white/30 
                   shadow-2xl rounded-3xl p-10 w-full max-w-md"
      >
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-200"><b>Email</b></label>
            <input
              type="email"
              required
              className="w-full p-3 mt-1 rounded-xl bg-white/30 text-white
                         placeholder-gray-300 border border-white/40
                         focus:ring-2 focus:ring-white/70"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-200"><b>Password</b></label>
            <input
              type="password"
              required
              className="w-full p-3 mt-1 rounded-xl bg-white/30 text-white
                         placeholder-gray-300 border border-white/40
                         focus:ring-2 focus:ring-white/70"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          {/* Login Button */}
          <button
            className="w-full py-3 mt-3 rounded-xl bg-blue-600 text-white 
                       font-semibold text-lg tracking-wide
                       hover:bg-blue-700 transition-all duration-200
                       hover:shadow-[0_0_20px_#3b82f6]"
          >
            Login
          </button>

          {/* Signup Link */}
          <p className="text-center text-gray-200 mt-2">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-white font-semibold hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
