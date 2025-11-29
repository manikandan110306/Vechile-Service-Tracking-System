import React, { useEffect, useState } from "react";
import serviceRequestApi from "../../api/serviceRequestApi";
import vehicleApi from "../../api/vehicleApi";
import { useNavigate, useParams } from "react-router-dom";

export default function RequestForm({ edit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: 1,           // ✅ FIXED (TEMP USER)
    vehicleId: "",
    serviceType: "",
    preferredDate: "",
    status: "PENDING",
    notes: "",
  });

  const [vehicles, setVehicles] = useState([]);

  // --------------------- LOAD VEHICLES + EDIT DATA ---------------------
  useEffect(() => {
    vehicleApi.list().then(setVehicles).catch(() => {});

    if (edit && id) {
      serviceRequestApi.get(id).then((data) => {
        setForm({
          userId: data.user?.userId || 1,
          vehicleId: data.vehicle?.vehicleId || "",
          serviceType: data.serviceType || "",
          preferredDate: data.preferredDate || "",
          status: data.status || "PENDING",
          notes: data.notes || "",
        });
      });
    }
  }, [edit, id]);

  // --------------------- SUBMIT FORM ---------------------
  const submit = async (e) => {
    e.preventDefault();

    // Debug print
    console.log("FORM DATA SENT:", form);

    const payload = {
      userId: Number(form.userId),
      vehicleId: Number(form.vehicleId),
      serviceType: form.serviceType,
      preferredDate: form.preferredDate,
      status: form.status,
      notes: form.notes,
    };

    if (!payload.vehicleId || !payload.preferredDate || !payload.serviceType) {
      alert("All fields are required!");
      return;
    }

    try {
      if (edit) {
        await serviceRequestApi.update(id, payload);
      } else {
        await serviceRequestApi.create(payload);
      }
      navigate("/service-requests");
    } catch (err) {
      console.error("ERROR:", err.response?.data || err);
      alert("Failed to save request. Check console.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        {edit ? "Edit Request" : "Create Request"}
      </h2>

      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Vehicle Dropdown */}
        <label>
          <div className="text-sm text-gray-600">Vehicle</div>
          <select
            className="border p-2"
            value={form.vehicleId}
            onChange={(e) =>
              setForm({ ...form, vehicleId: Number(e.target.value) })
            }
          >
            <option value="">Select Vehicle</option>
            {vehicles.map((v) => (
              <option key={v.vehicleId} value={v.vehicleId}>
                {v.vehicleNumber} - {v.brand}
              </option>
            ))}
          </select>
        </label>

        {/* Service Type */}
        <label>
          <div className="text-sm text-gray-600">Service Type</div>
          <input
            className="border p-2"
            value={form.serviceType}
            onChange={(e) =>
              setForm({ ...form, serviceType: e.target.value })
            }
          />
        </label>

        {/* Preferred Date */}
        <label>
          <div className="text-sm text-gray-600">Preferred Date</div>
          <input
            type="date"
            className="border p-2"
            value={form.preferredDate}
            onChange={(e) =>
              setForm({ ...form, preferredDate: e.target.value })
            }
          />
        </label>

        {/* Notes */}
        <label className="col-span-full">
          <div className="text-sm text-gray-600">Notes</div>
          <textarea
            className="border p-2 w-full"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </label>

        {/* Save Button */}
        <div className="col-span-full flex gap-2">
          <button className="px-4 py-2 bg-accent text-white rounded">
            Save
          </button>
        </div>

      </form>
    </div>
  );
}
