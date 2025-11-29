import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/users', label: 'Users' },
    { to: '/vehicles', label: 'Vehicles' },
    { to: '/service-requests', label: 'Service Requests' },
    { to: '/service-records', label: 'Service Records' },
    { to: '/mechanics', label: 'Mechanics' },
    { to: '/parts', label: 'Spare Parts' },
    { to: '/invoices', label: 'Invoices' },
    { to: '/feedback', label: 'Feedback' },
    { to: '/notifications', label: 'Notifications' }
  ];

  return (
    <aside className="w-56 bg-white border-r p-4 hidden md:block min-h-screen">
      <div className="mb-6 text-lg font-semibold">Menu</div>
      <nav className="flex flex-col space-y-2">
        {links.map(l => (
          <NavLink key={l.to} to={l.to}
            className={({isActive}) => `px-3 py-2 rounded ${isActive ? 'bg-accent text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
