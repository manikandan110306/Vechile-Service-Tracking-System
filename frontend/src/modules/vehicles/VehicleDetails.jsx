import React, { useEffect, useState } from "react";
import vehicleApi from "../../api/vehicleApi";
import { useParams } from "react-router-dom";

export default function VehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    vehicleApi.get(id).then(setVehicle);
  }, [id]);

  if (!vehicle) return "Loading...";

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Vehicle Details</h2>

      {Object.keys(vehicle).map((key) => (
        <p key={key}>
          <strong>{key}:</strong> {vehicle[key]}
        </p>
      ))}
    </div>
  );
}
