import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './modules/auth/Login';
import Signup from './modules/auth/Signup';

import Dashboard from './modules/dashboard/Dashboard';
import UserList from './modules/users/UserList';
import UserForm from './modules/users/UserForm';

import VehicleList from './modules/vehicles/VehicleList';
import VehicleForm from './modules/vehicles/VehicleForm';
import VehicleDetails from './modules/vehicles/VehicleDetails';

import RequestList from './modules/serviceRequests/RequestList';
import RequestForm from './modules/serviceRequests/RequestForm';

import RecordList from './modules/serviceRecords/RecordList';
import RecordForm from './modules/serviceRecords/RecordForm';

import MechanicList from './modules/mechanics/MechanicList';
import MechanicForm from './modules/mechanics/MechanicForm';

import InvoiceList from './modules/invoices/InvoiceList';
import InvoiceDetails from './modules/invoices/InvoiceDetails';

import PartsList from './modules/parts/PartsList';
import PartForm from './modules/parts/PartForm';

import PartUsageForm from './modules/partUsage/PartUsageForm';
import FeedbackList from './modules/feedback/FeedbackList';
import Notifications from './modules/notifications/Notifications';

import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';

export default function App() {
  return (
    <Routes>

      {/* AUTH PAGES */}
      <Route
        path="/login"
        element={
          <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <Login />
          </div>
        }
      />

      <Route
        path="/signup"
        element={
          <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <Signup />
          </div>
        }
      />

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="*"
          element={
            <div className="min-h-screen flex bg-gray-50">
              <Sidebar />

              <div className="flex-1 flex flex-col">
                <Navbar />

                <main className="p-6">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* USERS */}
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/new" element={<UserForm />} />
                    <Route path="/users/:id/edit" element={<UserForm edit />} />

                    {/* VEHICLES */}
                    <Route path="/vehicles" element={<VehicleList />} />
                    <Route path="/vehicles/new" element={<VehicleForm />} />
                    <Route path="/vehicles/:id" element={<VehicleDetails />} />
                    <Route path="/vehicles/:id/edit" element={<VehicleForm edit />} />

                    {/* SERVICE REQUESTS */}
                    <Route path="/service-requests" element={<RequestList />} />
                    <Route path="/service-requests/new" element={<RequestForm />} />
                    <Route path="/service-requests/:id/edit" element={<RequestForm edit />} />

                    {/* SERVICE RECORDS */}
                    <Route path="/service-records" element={<RecordList />} />
                    <Route path="/service-records/new" element={<RecordForm />} />

                    {/* MECHANICS */}
                    <Route path="/mechanics" element={<MechanicList />} />
                    <Route path="/mechanics/new" element={<MechanicForm />} />

                    {/* INVOICES */}
                    <Route path="/invoices" element={<InvoiceList />} />
                    <Route path="/invoices/:id" element={<InvoiceDetails />} />

                    {/* PARTS */}
                    <Route path="/parts" element={<PartsList />} />
                    <Route path="/parts/new" element={<PartForm />} />

                    {/* PART USAGE */}
                    <Route path="/part-usage/new" element={<PartUsageForm />} />

                    {/* FEEDBACK */}
                    <Route path="/feedback" element={<FeedbackList />} />

                    {/* NOTIFICATIONS */}
                    <Route path="/notifications" element={<Notifications />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Route>

    </Routes>
  );
}
