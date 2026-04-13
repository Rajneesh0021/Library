import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import AdminOverview from './admin/AdminOverview';
import AdminMembers from './admin/AdminMembers';
import AdminSeats from './admin/AdminSeats';

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="members" element={<AdminMembers />} />
        <Route path="seats" element={<AdminSeats />} />
        <Route path="books" element={<div className="p-8"><h2 className="text-2xl font-black font-serif italic text-foreground">Book Collection Master</h2><p className="text-muted-foreground mt-4 italic font-serif opacity-60 italic font-serif">Curating scholarly resources for spiritual growth...</p></div>} />
        <Route path="requests" element={<div className="p-8"><h2 className="text-2xl font-black font-serif italic text-foreground">Admission Registry Requests</h2><p className="text-muted-foreground mt-4 italic font-serif opacity-60 italic font-serif">Processing pending sanctuary entry requests...</p></div>} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;
