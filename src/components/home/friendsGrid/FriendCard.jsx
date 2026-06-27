import React from 'react';
import { Link } from 'react-router';

const FriendCard = ({ friend }) => {
  // স্ট্যাটাস অনুযায়ী ব্যাজ কালার নির্ধারণ
  const getStatusBadge = (status) => {
    switch (status) {
      case 'overdue':
        return 'bg-red-100 text-red-700 font-semibold';
      case 'almost due':
        return 'bg-amber-100 text-amber-700 font-semibold';
      case 'on-track':
        return 'bg-green-100 text-green-700 font-semibold';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <Link 
      to={`/friend/${friend.id}`} 
      className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all relative overflow-hidden"
    >
      {/* গোলাকার ছবি */}
      <img 
        src={friend.picture} 
        alt={friend.name} 
        className="w-20 h-20 rounded-full object-cover mb-5"
      />

      {/* নাম ও শেষ যোগাযোগের সময় */}
      <h4 className="text-lg font-bold text-[#1E293B]">{friend.name}</h4>
      <p className="text-xs text-[#64748B] mt-1">{friend.days_since_contact} days ago</p>

      {/* ট্যাগসমূহ */}
      <div className="flex flex-wrap justify-center gap-1.5 mt-4">
        {friend.tags && friend.tags.map((tag, index) => (
          <span 
            key={index} 
            className="bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* স্ট্যাটাস ব্যাজ */}
      <div className="mt-6 pt-4 w-full border-t border-slate-50 flex justify-center">
        <span className={`text-xs px-4 py-1.5 rounded-full capitalize ${getStatusBadge(friend.status)}`}>
          {friend.status.replace('-', ' ')}
        </span>
      </div>
    </Link>
  );
};

export default FriendCard;