import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Admin/Login';
import Dashboard from '../components/Admin/Dashboard';

export default function AdminPage() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}