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
    const user = await login(form);
    alert("Login successful!");
    navigate("/dashboard");
  } catch (err) {
    alert("Invalid email or password");
  }
};


  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <label>
            <div className="text-sm text-gray-600">Email</div>
            <input
              className="w-full p-2 border rounded"
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            <div className="text-sm text-gray-600">Password</div>
            <input
              type="password"
              className="w-full p-2 border rounded"
              name="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-accent text-white rounded">
              Login
            </button>
            <a className="text-sm text-blue-600" href="/signup">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
