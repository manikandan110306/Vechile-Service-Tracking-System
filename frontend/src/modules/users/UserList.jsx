import React, {useEffect, useState} from 'react';
import userApi from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/UI/Card';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    userApi.list().then(setUsers).catch(() => {});
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Users</h2>
        <button 
          onClick={() => navigate('/users/new')} 
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      <Card>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 border-b text-gray-700">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr key={u.userId} className="border-b hover:bg-gray-50 transition">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>

                {/* ROLE BADGE */}
                <td className="p-2">
                  <span className={
                    "px-2 py-1 rounded-full text-xs font-semibold " +
                    (u.role === "ADMIN" ? "bg-red-200 text-red-800" :
                     u.role === "MECHANIC" ? "bg-yellow-200 text-yellow-800" :
                     "bg-green-200 text-green-800")
                  }>
                    {u.role}
                  </span>
                </td>

                <td className="p-2">
                  <button 
                    onClick={() => navigate(`/users/${u.userId}/edit`)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </Card>
    </div>
  );
}
