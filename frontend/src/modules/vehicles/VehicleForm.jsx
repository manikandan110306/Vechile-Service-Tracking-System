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
    fuelType: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (edit && id) {
      vehicleApi.get(id).then((data) => {
        // Map only needed fields (ignore user, id, etc.)
        setForm({
          vehicleNumber: data.vehicleNumber || "",
          brand: data.brand || "",
          model: data.model || "",
          year: data.year || "",
          vehicleType: data.vehicleType || "",
          fuelType: data.fuelType || "",
        });
      });
    }
  }, [edit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      vehicleNumber: form.vehicleNumber,
      brand: form.brand,
      model: form.model,
      year: Number(form.year),
      vehicleType: form.vehicleType,
      fuelType: form.fuelType,
    };

    console.log("VEHICLE PAYLOAD:", payload);

    try {
      setSaving(true);
      if (edit) {
        await vehicleApi.update(id, payload);
      } else {
        await vehicleApi.create(payload);
      }
      navigate("/vehicles");
    } catch (err) {
      console.error("Vehicle save error:", err.response?.data || err);
      alert("Failed to save vehicle. See console for details.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {edit ? "Edit Vehicle" : "Add Vehicle"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <label className="block">
          <span className="text-gray-700">Vehicle Number</span>
          <input
            className="border p-2 w-full"
            value={form.vehicleNumber}
            onChange={(e) =>
              setForm({ ...form, vehicleNumber: e.target.value })
            }
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Brand</span>
          <input
            className="border p-2 w-full"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Model</span>
          <input
            className="border p-2 w-full"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Year</span>
          <input
            className="border p-2 w-full"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Vehicle Type</span>
          <select
            className="border p-2 w-full"
            value={form.vehicleType}
            onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
          >
            <option value="">Select Vehicle Type</option>
            <option value="Two Wheeler">Two Wheeler</option>
            <option value="Four Wheeler">Four Wheeler</option>
            <option value="Truck">Truck</option>
            <option value="Bus">Bus</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Fuel Type</span>
          <select
            className="border p-2 w-full"
            value={form.fuelType}
            onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
          >
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
            <option value="EV">EV</option>
          </select>
        </label>

          
        <div className="col-span-full">
          <br></br>
          <center>
          <button type="submit" disabled={saving} className="px-4 py-2 bg-accent text-white rounded disabled:opacity-60">
            {saving ? 'Saving...' : 'Save'}
          </button>
          </center>
        </div>
      </form>
    </div>
  );
}

