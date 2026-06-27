import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaCommentAlt, FaVideo, FaTrashAlt } from 'react-icons/fa';
import { RiUserSharedLine } from 'react-icons/ri';

const Timeline = () => {
  const [timelineLogs, setTimelineLogs] = useState([]);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('timeline_logs')) || [];
    setTimelineLogs(storedLogs);
  }, []);

  // 🗑️ History ba log delete korar logic
  const handleDeleteLog = (id) => {
    const updatedLogs = timelineLogs.filter((log) => log.id !== id);
    setTimelineLogs(updatedLogs);
    localStorage.setItem('timeline_logs', JSON.stringify(updatedLogs));
  };

  const getActionIcon = (actionText) => {
    const textLower = actionText.toLowerCase();
    if (textLower.includes('call')) {
      return (
        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 text-slate-600">
          <FaPhoneAlt size={16} />
        </div>
      );
    } else if (textLower.includes('text')) {
      return (
        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 text-slate-600">
          <FaCommentAlt size={16} />
        </div>
      );
    } else if (textLower.includes('video')) {
      return (
        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 text-slate-600">
          <FaVideo size={16} />
        </div>
      );
    } else {
      return (
        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100 text-amber-600">
          <RiUserSharedLine size={18} />
        </div>
      );
    }
  };

  const formatActionTitle = (actionText) => {
    if (actionText.startsWith('Called')) {
      return { type: 'Call', detail: actionText.replace('Called', 'with') };
    }
    if (actionText.startsWith('Sent text')) {
      return { type: 'Text', detail: actionText.replace('Sent text to', 'with') };
    }
    if (actionText.startsWith('Video call')) {
      return { type: 'Video', detail: actionText.replace('Video call with', 'with') };
    }
    return { type: 'Activity', detail: actionText };
  };

  return (
    <div className="min-h-[70vh] w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Header title o filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Timeline</h2>
        
        {/* Filter dropdown */}
        <div className="relative w-full sm:w-48">
          <select 
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-600 font-medium outline-none cursor-pointer shadow-sm"
            defaultValue=""
          >
            <option value="" disabled>Filter timeline</option>
            <option value="all">All Activities</option>
            <option value="call">Calls</option>
            <option value="text">Texts</option>
            <option value="video">Videos</option>
          </select>
        </div>
      </div>

      {/* Timeline list */}
      <div className="flex flex-col gap-3">
        {timelineLogs.length > 0 ? (
          timelineLogs.map((log) => {
            const actionInfo = formatActionTitle(log.action);
            return (
              <div 
                key={log.id}
                className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  {getActionIcon(log.action)}
                  
                  {/* Action text o detail */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {actionInfo.type} <span className="font-normal text-slate-500">{actionInfo.detail}</span>
                    </h4>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">{log.date}</p>
                  </div>
                </div>

                {/* 🗑️ Delete Button */}
                <button 
                  onClick={() => handleDeleteLog(log.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
                  title="Delete activity"
                >
                  <FaTrashAlt size={16} />
                </button>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
            <p className="text-slate-500 font-medium">No timeline activities recorded yet.</p>
            <p className="text-slate-400 text-xs mt-2">Go to a friend's detail page to log a call, text, or video call.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Timeline;