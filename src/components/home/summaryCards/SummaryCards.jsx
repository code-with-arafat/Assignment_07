import React from 'react';

const SummaryCards = ({ totalFriends, onTrackCount, needAttentionCount, interactionsCount }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {/* টোটাল ফ্রেন্ডস কার্ড */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all">
          <h3 className="text-4xl font-bold text-[#1B4332] tracking-tight">
            10
          </h3>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Total Friends
          </p>
        </div>

        {/* অন ট্র্যাক কার্ড */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all">
          <h3 className="text-4xl font-bold text-[#1B4332] tracking-tight">
            3
          </h3>
          <p className="mt-2 text-sm font-medium text-slate-500">
            On Track
          </p>
        </div>

        {/* নিড অ্যাটেনশন কার্ড */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all">
          <h3 className="text-4xl font-bold text-[#1B4332] tracking-tight">
            6
          </h3>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Need Attention
          </p>
        </div>

        {/* ইন্টারেকশন কার্ড */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all">
          <h3 className="text-4xl font-bold text-[#1B4332] tracking-tight">
            12
          </h3>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Interactions This Month
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;