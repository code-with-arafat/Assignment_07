import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPhoneAlt, FaCommentAlt, FaVideo, FaRegClock, FaArchive, FaTrashAlt } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import friendsData from '../../data/friends.json';
import Nav from '../../components/shared/navber/Nav';
import Footer from '../../components/shared/footer/Footer';

const FriendDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundFriend = friendsData.find((f) => f.id === parseInt(id));
    
    const timer = setTimeout(() => {
      setFriend(foundFriend);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [id]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'overdue':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'almost due':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'on-track':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // 📝 ধাপ ৫.১ ও ৫.২: কুইক চেক-ইন হ্যান্ডলার ও লোকাল স্টোরেজ লজিক
  const handleCheckIn = (actionType) => {
    if (!friend) return;

    let actionTitle = '';
    let successMessage = '';

    // বর্তমান তারিখ জেনারেট করা (২০২৬ সালের বর্তমান সময় অনুযায়ী)
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    if (actionType === 'call') {
      actionTitle = `Called ${friend.name}`;
      successMessage = `Call logged successfully for ${friend.name}!`;
    } else if (actionType === 'text') {
      actionTitle = `Sent text to ${friend.name}`;
      successMessage = `Text logged successfully for ${friend.name}!`;
    } else if (actionType === 'video') {
      actionTitle = `Video call with ${friend.name}`;
      successMessage = `Video call logged successfully for ${friend.name}!`;
    }

    // নতুন টাইমলাইন অবজেক্ট তৈরি
    const newTimelineEntry = {
      id: Date.now(), // ইউনিক আইডি
      friendId: friend.id,
      action: actionTitle,
      date: currentDate,
      timestamp: new Date().toISOString(),
    };

    // লোকাল স্টোরেজ বা স্টেট থেকে পূর্ববর্তী টাইমলাইন ডাটা নেওয়া
    const existingTimeline = JSON.parse(localStorage.getItem('timeline_logs')) || [];
    
    // নতুন ডাটা যোগ করে লোকাল স্টোরেজে সেভ করা
    const updatedTimeline = [newTimelineEntry, ...existingTimeline];
    localStorage.setItem('timeline_logs', JSON.stringify(updatedTimeline));

    // 5.1 টোস্ট নোটিফিকেশন পপ-আপ দেখানো
    toast.success(successMessage, {
      style: {
        background: '#1B4332',
        color: '#fff',
        borderRadius: '12px',
        fontWeight: '500',
        fontSize: '14px',
      },
      iconTheme: {
        primary: '#DCFCE7',
        secondary: '#1B4332',
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col justify-center items-center bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#1B4332] border-t-transparent"></div>
        <p className="mt-4 text-slate-600 font-medium">Loading friend details...</p>
      </div>
    );
  }

  if (!friend) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center bg-[#F8FAFC]">
        <h2 className="text-2xl font-bold text-slate-800">Friend Not Found</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2.5 bg-[#1B4332] text-white rounded-xl font-medium"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      {/* টোস্ট নোটিফিকেশন রেন্ডার করার জন্য */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* ন্যাভবার ফুল উইডথ কন্টেইনার */}
      <div className="w-full bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Nav />
        </div>
      </div>

      {/* মেইন বডি সেকশন */}
      <div className="flex-grow w-full max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* বাম পাশের প্রোফাইল কার্ড */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 p-8 flex flex-col items-center text-center shadow-sm">
            <img 
              src={friend.picture} 
              alt={friend.name} 
              className="w-24 h-24 rounded-full object-cover shadow-sm mb-5"
            />
            <h2 className="text-2xl font-bold text-slate-900">{friend.name}</h2>
            
            <div className="flex items-center gap-2 mt-3">
              <span className={`text-xs px-3 py-1 rounded-full capitalize border font-semibold ${getStatusBadge(friend.status)}`}>
                {friend.status.replace('-', ' ')}
              </span>
              {friend.tags && friend.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            {friend.note && (
              <p className="mt-6 text-sm text-slate-600 italic max-w-xs">
                "{friend.note}"
              </p>
            )}

            <p className="text-xs text-slate-400 mt-4">
              Preferred: {friend.preferred_contact || 'email'}
            </p>

            {/* একশন বাটনসমূহ */}
            <div className="w-full mt-8 flex flex-col gap-3">
              <button className="w-full py-3 border border-slate-200 rounded-xl text-slate-700 font-medium text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <FaRegClock size={16} /> Snooze 2 Weeks
              </button>
              <button className="w-full py-3 border border-slate-200 rounded-xl text-slate-700 font-medium text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <FaArchive size={16} /> Archive
              </button>
              <button className="w-full py-3 border border-red-200 bg-red-50/30 rounded-xl text-red-600 font-medium text-sm hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                <FaTrashAlt size={16} /> Delete
              </button>
            </div>
          </div>

          {/* ডান পাশের ইনফরমেশন ও কুইক চেক-ইন সেকশন */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* টপ ৩ স্ট্যাটাস কার্ড */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col items-center justify-center shadow-sm">
                <span className="text-3xl font-bold text-[#1B4332] tracking-tight">{friend.days_since_contact || 62}</span>
                <span className="mt-2 text-xs font-semibold text-slate-500">Days Since Contact</span>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col items-center justify-center shadow-sm">
                <span className="text-3xl font-bold text-[#1B4332] tracking-tight">{friend.goal_days || 30}</span>
                <span className="mt-2 text-xs font-semibold text-slate-500">Goal (Days)</span>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col items-center justify-center shadow-sm">
                <span className="text-base font-bold text-[#1B4332] tracking-tight whitespace-nowrap">{friend.next_due_date || 'Feb 27, 2026'}</span>
                <span className="mt-2 text-xs font-semibold text-slate-500">Next Due</span>
              </div>
            </div>

            {/* রিলেশনশিপ গোল সেকশন */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900">Relationship Goal</h4>
                <p className="text-sm text-slate-600 mt-1">Connect every <span className="font-semibold text-slate-900">{friend.goal_days || 30} days</span></p>
              </div>
              <button className="px-5 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all">
                Edit
              </button>
            </div>

            {/* কুইক চেক-ইন সেকশন */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h4 className="text-base font-bold text-slate-900 mb-4">Quick Check-In</h4>
              <div className="grid grid-cols-3 gap-4">
                <button 
                  onClick={() => handleCheckIn('call')}
                  className="py-6 border border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-slate-300 hover:bg-slate-50/50 transition-all text-slate-700 cursor-pointer"
                >
                  <FaPhoneAlt size={22} className="text-[#1B4332]" />
                  <span className="text-xs font-medium">Call</span>
                </button>
                <button 
                  onClick={() => handleCheckIn('text')}
                  className="py-6 border border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-slate-300 hover:bg-slate-50/50 transition-all text-slate-700 cursor-pointer"
                >
                  <FaCommentAlt size={22} className="text-[#1B4332]" />
                  <span className="text-xs font-medium">Text</span>
                </button>
                <button 
                  onClick={() => handleCheckIn('video')}
                  className="py-6 border border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-slate-300 hover:bg-slate-50/50 transition-all text-slate-700 cursor-pointer"
                >
                  <FaVideo size={22} className="text-[#1B4332]" />
                  <span className="text-xs font-medium">Video</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ফুটার সেকশন */}
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default FriendDetails;