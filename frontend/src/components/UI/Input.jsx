import React from 'react';
export default function Input({ label, name, value, onChange, type='text', placeholder='' }) {
  return (
    <label className="block">
      {label && <div className="text-sm text-gray-600 mb-1">{label}</div>}
      <input name={name} value={value} onChange={onChange} type={type}
        placeholder={placeholder}
        className="w-full p-2 border rounded" />
    </label>
  );
}
