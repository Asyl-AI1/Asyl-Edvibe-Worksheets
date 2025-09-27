import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg mb-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between py-2 px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Asyl Edvibe Worksheets" className="h-8" />
          <span className="text-xl font-bold text-primary">Asyl Edvibe Worksheets</span>
        </Link>
        <div>
          <Link to="/admin" className="text-accent font-semibold hover:underline">Admin</Link>
        </div>
      </div>
    </nav>
  );
}