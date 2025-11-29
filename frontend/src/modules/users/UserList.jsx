import React, {useEffect, useState} from 'react';
import userApi from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/UI/Card';

export default function UserList(){
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{ userApi.list().then(setUsers).catch(()=>{}) },[]);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <button onClick={()=>navigate('/users/new')} className="px-4 py-2 bg-accent text-white rounded">Add User</button>
      </div>
      <Card>
        <table className="w-full">
          <thead><tr className="border-b"><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map(u=>(
              <tr key={u.userId} className="border-b">
                <td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
                <td>
                  <button onClick={()=>navigate(`/users/${u.userId}/edit`)} className="text-blue-600">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
