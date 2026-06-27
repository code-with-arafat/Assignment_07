import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const Banner = () => {
  return (
    <div className="bg-[#F8FAFC] py-20 px-4 sm:px-6 lg:px-8 rounded-3xl mb-12 flex flex-col items-center text-center">
      <h1 className="text-3xl md:text-6xl font-bold text-[#0F172A] tracking-tight max-w-3xl">
        Friends to keep close in your life
      </h1>
      <p className="mt-5 max-w-xl text-[#64748B] text-base md:text-lg leading-relaxed">
        Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
      </p>
      <div className="mt-8">
        <Link 
          to="/add-friend" 
          className="inline-flex items-center px-6 py-4 bg-[#1B4332] hover:text-white text-white font-medium rounded-xl shadow-sm transition-all gap-2"
        >
          <FaPlus size={16} /> Add a Friend
        </Link>
      </div>
    </div>
  );
};

export default Banner;