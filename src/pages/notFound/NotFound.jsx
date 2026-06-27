import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <h1 className="text-8xl font-extrabold text-[#1B4332] tracking-widest">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 mt-4">Page Not Found</h2>
      <p className="text-slate-500 mt-2 text-center max-w-md">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="mt-8 px-6 py-3 bg-[#1B4332] text-white font-medium rounded-xl shadow-sm hover:bg-[#2d6a4f] transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;