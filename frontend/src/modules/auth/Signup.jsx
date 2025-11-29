import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authApi from '../../api/authApi';

export default function Signup(){
  const [form, setForm] = useState({ name:'', email:'', password:''});
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone || "",
      role: "CUSTOMER"
    };

    const user = await authApi.signup(payload);

    alert("Signup successful");
    navigate("/login");
  } catch (err) {
    alert(err || "Signup failed");
  }
};


  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Sign up</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <label>
            <div className="text-sm text-gray-600">Name</div>
            <input className="w-full p-2 border rounded" name="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          </label>
          <label>
            <div className="text-sm text-gray-600">Email</div>
            <input className="w-full p-2 border rounded" name="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          </label>
          <label>
            <div className="text-sm text-gray-600">Password</div>
            <input type="password" className="w-full p-2 border rounded" name="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
          </label>
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-accent text-white rounded">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
