import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UploadForm from './UploadForm';
import WorksheetList from './WorksheetList';
import Stats from './Stats';

export default function Dashboard() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <nav className="mb-4 flex gap-4">
        <Link to="upload" className="text-primary font-semibold hover:underline">Upload</Link>
        <Link to="worksheets" className="text-primary font-semibold hover:underline">Worksheets</Link>
        <Link to="stats" className="text-primary font-semibold hover:underline">Stats</Link>
      </nav>
      <Routes>
        <Route path="upload" element={<UploadForm />} />
        <Route path="worksheets" element={<WorksheetList />} />
        <Route path="stats" element={<Stats />} />
      </Routes>
    </div>
  );
}