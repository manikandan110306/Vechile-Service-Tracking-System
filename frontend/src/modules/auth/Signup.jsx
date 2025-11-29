import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authApi.signup({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: "",
        role: "CUSTOMER",
      });

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center 
                 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500
                 p-4"
    >
      <div
        className="bg-white/20 backdrop-blur-xl border border-white/30 
                   shadow-2xl rounded-3xl p-10 w-full max-w-md"
      >
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-200"><b>Name</b></label>
            <input
              className="w-full p-3 mt-1 rounded-xl bg-white/30 text-white
                         placeholder-gray-300 border border-white/40
                         focus:ring-2 focus:ring-white/70"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-200"><b>Email</b></label>
            <input
              type="email"
              className="w-full p-3 mt-1 rounded-xl bg-white/30 text-white
                         placeholder-gray-300 border border-white/40
                         focus:ring-2 focus:ring-white/70"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-200"><b>Password</b></label>
            <input
              type="password"
              className="w-full p-3 mt-1 rounded-xl bg-white/30 text-white
                         placeholder-gray-300 border border-white/40
                         focus:ring-2 focus:ring-white/70"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {/* Signup Button */}
          <button
            className="w-full py-3 mt-3 rounded-xl bg-pink-600 text-white 
                       font-semibold text-lg tracking-wide
                       hover:bg-pink-700 transition-all duration-200
                       hover:shadow-[0_0_20px_#ec4899]"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-200 mt-2">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-white font-semibold hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
