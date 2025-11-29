import React, {useEffect, useState} from 'react';
import vehicleApi from '../../api/vehicleApi';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/UI/Card';

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    vehicleApi
      .list()
      .then((data) => setVehicles(Array.isArray(data) ? data : data?.content || []))
      .catch(() => setVehicles([]));
  }, []);

  const del = async (id) => {
    if (!window.confirm('Delete?')) return;
    await vehicleApi.remove(id);
    setVehicles(v => v.filter(x => x.vehicleId !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">My Vehicles</h2>
        <Link 
          to="/vehicles/new" 
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          <h1>Add Vehicle</h1>
        </Link>
      </div>

      <Card>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 border-b text-gray-700">
              <th className="p-2">Number</th>
              <th className="p-2">Brand</th>
              <th className="p-2">Model</th>
              <th className="p-2">Year</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {(vehicles || []).map(v => (
              <tr key={v.vehicleId} className="border-b hover:bg-gray-50 transition">
                <td className="p-2">{v.vehicleNumber}</td>
                <td className="p-2">{v.brand}</td>
                <td className="p-2">{v.model}</td>
                <td className="p-2">{v.year}</td>

                <td className="p-2 flex gap-3">
                  <button 
                    onClick={() => navigate(`/vehicles/${v.vehicleId}`)} 
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>

                  <button 
                    onClick={() => navigate(`/vehicles/${v.vehicleId}/edit`)} 
                    className="text-green-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button 
                    onClick={() => del(v.vehicleId)} 
                    className="text-red-600 hover:underline"
                  >
                    Delete
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
