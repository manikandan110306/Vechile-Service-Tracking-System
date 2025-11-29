import React, {useEffect, useState} from 'react';
import serviceRequestApi from '../../api/serviceRequestApi';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/UI/Card';

export default function RequestList(){
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{ serviceRequestApi.list().then(setList).catch(()=>{}) },[]);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Service Requests</h2>
        <Link to="/service-requests/new" className="px-4 py-2 bg-accent text-white rounded">New Request</Link>
      </div>
      <Card>
        <table className="w-full">
          <thead><tr className="border-b"><th>ID</th><th>Vehicle</th><th>Service</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {list.map(r=>(
              <tr key={r.requestId} className="border-b">
                <td>{r.requestId}</td><td>{r.vehicleId}</td><td>{r.serviceType}</td><td>{r.preferredDate}</td><td>{r.status}</td>
                <td>
                  <button onClick={()=>navigate(`/service-requests/${r.requestId}/edit`)} className="text-green-600">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
