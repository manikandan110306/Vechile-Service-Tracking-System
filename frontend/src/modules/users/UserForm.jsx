import React, { useState, useEffect } from "react";
import userApi from "../../api/userApi";
import { useNavigate, useParams } from "react-router-dom";

export default function UserForm({ edit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    role: "CUSTOMER",
    password: "" // used only when adding or updating password
  });

  /** 🔥 Load user data when editing */
  useEffect(() => {
    if (edit && id) {
      userApi
        .get(id)
        .then((res) => {
          const user = res;
          setF({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            role: user.role || "CUSTOMER",
            password: "" // keep empty so user can change it only if needed
          });
        })
        .catch(() => {});
    }
  }, [edit, id]);

  /** 🔥 Submit (Create / Update) */
  const submit = async (e) => {
    e.preventDefault();

    try {
      let payload = { ...f };

      /** In edit mode: remove password field if user hasn't entered a new one */
      if (edit) {
        if (!f.password || f.password.trim() === "") {
          delete payload.password;
        }
      }

      /** Create or Update */
      if (edit) {
        await userApi.update(id, payload);
      } else {
        await userApi.create(payload);
      }

      navigate("/users");
    } catch (e) {
      console.error(e);
      alert("Save failed");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        {edit ? "Edit User" : "Add User"}
      </h2>

      <form
        onSubmit={submit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Name */}
        <label>
          <div className="text-sm text-gray-600">Name</div>
          <input
            className="border p-2 w-full"
            value={f.name}
            onChange={(e) => setF({ ...f, name: e.target.value })}
            required
          />
        </label>

        {/* Email (locked in edit mode) */}
        <label>
          <div className="text-sm text-gray-600">Email</div>
          <input
            className="border p-2 w-full bg-gray-100 cursor-not-allowed"
            value={f.email}
            disabled={edit}
            onChange={(e) => setF({ ...f, email: e.target.value })}
            required
          />
        </label>

        {/* Phone */}
        <label>
          <div className="text-sm text-gray-600">Phone</div>
          <input
            className="border p-2 w-full"
            value={f.phone}
            onChange={(e) => setF({ ...f, phone: e.target.value })}
          />
        </label>

        {/* Role */}
        <label>
          <div className="text-sm text-gray-600">Role</div>
          <select
            className="border p-2 w-full"
            value={f.role}
            onChange={(e) => setF({ ...f, role: e.target.value })}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="MECHANIC">MECHANIC</option>
          </select>
        </label>

        {/* Password (only visible when creating OR editing password manually) */}
        <label className="md:col-span-2">
          <div className="text-sm text-gray-600">
            {edit ? "New Password (optional)" : "Password"}
          </div>
          <input
            type="password"
            className="border p-2 w-full"
            value={f.password}
            onChange={(e) => setF({ ...f, password: e.target.value })}
            placeholder={edit ? "Leave empty to keep old password" : ""}
            {...(!edit ? { required: true } : {})}
          />
        </label>

        {/* Buttons */}
        <div className="col-span-full flex gap-2 mt-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            type="submit"
          >
            Save
          </button>

          <button
            type="button"
            className="px-4 py-2 border rounded"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
