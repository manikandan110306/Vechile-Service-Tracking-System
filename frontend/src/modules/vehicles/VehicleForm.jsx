import React, { useEffect, useState } from "react";
import vehicleApi from "../../api/vehicleApi";
import { useNavigate, useParams } from "react-router-dom";

export default function VehicleForm({ edit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    vehicleNumber: "",
    brand: "",
    model: "",
    year: "",
    vehicleType: "",
    fuelType: ""
  });

  useEffect(() => {
    if (edit && id) {
      vehicleApi.get(id).then((data) => setForm(data));
    }
  }, [edit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (edit) await vehicleApi.update(id, form);
    else await vehicleApi.create(form);

    navigate("/vehicles");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{edit ? "Edit Vehicle" : "Add Vehicle"}</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {Object.keys(form).map((key) => (
          <label key={key} className="block">
            <span className="text-gray-700">{key}</span>
            <input
              className="border p-2 w-full"
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </label>
        ))}

        <button className="col-span-2 px-4 py-2 bg-accent text-white rounded">
          Save
        </button>
      </form>
    </div>
  );
}
