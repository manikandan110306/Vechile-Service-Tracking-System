import React,{useEffect,useState} from 'react';
import vehicleApi from '../../api/vehicleApi';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/UI/Card';

export default function VehicleList(){
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{ vehicleApi.list().then(setVehicles).catch(()=>{}); },[]);
  const del = async (id)=>{ if(!window.confirm('Delete?')) return; await vehicleApi.remove(id); setVehicles(v=>v.filter(x=>x.vehicleId!==id)); }
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Vehicles</h2>
        <Link to="/vehicles/new" className="px-4 py-2 bg-accent text-white rounded">Add Vehicle</Link>
      </div>
      <Card>
        <table className="w-full">
          <thead><tr className="border-b"><th>No</th><th>Brand</th><th>Model</th><th>Year</th><th>Actions</th></tr></thead>
          <tbody>
            {vehicles.map(v=>(
              <tr key={v.vehicleId} className="border-b">
                <td>{v.vehicleNumber}</td><td>{v.brand}</td><td>{v.model}</td><td>{v.year}</td>
                <td>
                  <button onClick={()=>navigate(`/vehicles/${v.vehicleId}`)} className="text-blue-600 mr-2">View</button>
                  <button onClick={()=>navigate(`/vehicles/${v.vehicleId}/edit`)} className="text-green-600 mr-2">Edit</button>
                  <button onClick={()=>del(v.vehicleId)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
