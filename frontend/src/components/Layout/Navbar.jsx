import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white border-b px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold text-accent">Vehicle Service Tracking System</div>
      </div>
      <div className="flex items-center gap-4">
        {user ? <div className="text-sm">Hello, {user.name}</div> : null}
        {user ? <button onClick={logout} className="px-3 py-1 border rounded">Logout</button> : null}
      </div>
    </header>
  );
}
