import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaHistory, FaChartBar } from 'react-icons/fa';

const Nav = () => {
  const activeLink = "flex items-center gap-2 bg-[#1B4332] text-white px-5 py-2.5 rounded-lg font-medium transition-all";
  const normalLink = "flex items-center gap-2 text-[#4A5568] hover:text-[#1B4332] px-5 py-2.5 rounded-lg font-medium transition-all";

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* লোগো সেকশন */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-[#1B4332] tracking-tight">
              KeenKeeper
            </span>
          </div>

          {/* ন্যাভিগেশন লিংকস */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-2">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? activeLink : normalLink}
            >
              <FaHome size={18} />
              <span>Home</span>
            </NavLink>
            <NavLink 
              to="/timeline" 
              className={({ isActive }) => isActive ? activeLink : normalLink}
            >
              <FaHistory size={18} />
              <span>Timeline</span>
            </NavLink>
            <NavLink 
              to="/stats" 
              className={({ isActive }) => isActive ? activeLink : normalLink}
            >
              <FaChartBar size={18} />
              <span>Stats</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;