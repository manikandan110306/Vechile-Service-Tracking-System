import React, {useEffect, useState} from 'react';
import serviceRequestApi from '../../api/serviceRequestApi';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/UI/Card';

export default function RequestList(){
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    serviceRequestApi
      .list()
      .then((data) => setList(Array.isArray(data) ? data : data?.content || []))
      .catch(()=> setList([]));
  },[]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Service Requests</h2>
        <Link
          to="/service-requests/new"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          New Request
        </Link>
      </div>

      <Card>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2">ID</th>
              <th className="p-2">Vehicle</th>
              <th className="p-2">Service</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {(list || []).map(r=>(
              <tr key={r.requestId} className="border-b hover:bg-gray-50">
                <td className="p-2">{r.requestId}</td>

                {/* VEHICLE DISPLAY */}
                <td className="p-2">
                  {r.vehicle
                    ? `${r.vehicle.vehicleNumber} - ${r.vehicle.brand}`
                    : "No vehicle"}
                </td>

                <td className="p-2">{r.serviceType}</td>
                <td className="p-2">{r.preferredDate}</td>
                <td className="p-2">{r.status}</td>

                <td className="p-2">
                  <button
                    onClick={()=>navigate(`/service-requests/${r.requestId}/edit`)}
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
