import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const Stats = () => {
  const [interactionData, setInteractionData] = useState([
    { name: 'Text', value: 0 },
    { name: 'Call', value: 0 },
    { name: 'Video', value: 0 },
  ]);

  useEffect(() => {
    // লোকাল স্টোরেজ থেকে টাইমলাইন লগ ফেচ করা
    const storedLogs = JSON.parse(localStorage.getItem('timeline_logs')) || [];

    // ডায়নামিকালি অ্যাকশন টাইপ কাউন্ট করা
    let textCount = 0;
    let callCount = 0;
    let videoCount = 0;

    storedLogs.forEach(log => {
      const action = log.action.toLowerCase();
      if (action.includes('text')) textCount++;
      else if (action.includes('call')) callCount++;
      else if (action.includes('video')) videoCount++;
    });

    // যদি কোনো ডাটা না থাকে, তবুও UI সুন্দর রাখতে মিনিমাম ১ করে ভ্যালু দেওয়া যেতে পারে, 
    // অথবা ফিগমা ডেমো অনুযায়ী ডিফল্ট ভ্যালু সেট করা যায়। 
    // নিচে ডায়নামিক ডাটা সেট করা হলো (লগ না থাকলে ০ দেখাবে):
    setInteractionData([
      { name: 'Text', value: textCount },
      { name: 'Call', value: callCount },
      { name: 'Video', value: videoCount },
    ]);
  }, []);

  // ফিগমার কালার কোড অনুযায়ী ডোনাট চার্টের কালার প্যালেট
  // Text -> Purple (#8B5CF6), Call -> Dark Green (#1B4332), Video -> Medium Green (#34D399)
  const COLORS = ['#8B5CF6', '#1B4332', '#34D399'];

  // কাস্টম ডট বা লিজেন্ড লেবেল রেন্ডার করার জন্য
  const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex justify-center items-center gap-8 mt-4">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }} 
            />
            <span className="text-xs font-bold text-slate-600 capitalize tracking-wide">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      
      {/* মূল কন্টেন্ট এরিয়া */}
      <div className="flex-grow w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* হেডার টাইটেল */}
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-8">
          Friendship Analytics
        </h2>

        {/* পাই-চার্ট হোয়াইট কার্ড */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <h3 className="text-sm font-bold text-[#1B4332] mb-6">
            By Interaction Type
          </h3>

          {/* ডোনাট (পাই) চার্ট ও রেসপন্সিভ কন্টেইনার */}
          <div className="w-full h-80 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={interactionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={105}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {interactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend 
                  content={renderCustomLegend} 
                  verticalAlign="bottom" 
                  align="center" 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Stats;