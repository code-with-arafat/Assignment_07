import React, { useState, useEffect } from 'react';
import Banner from '../../components/home/banner/Banner';
import SummaryCards from '../../components/home/summaryCards/SummaryCards';
import FriendsGrid from '../../components/home/friendsGrid/FriendsGrid';
import friendsData from '../../data/friends.json';

const HomePage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#1B4332] border-t-transparent"></div>
        <p className="mt-4 text-slate-600 font-medium">Loading your friends data...</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Banner />
      <SummaryCards />
      <FriendsGrid friends={friends} />
    </div>
  );
};

export default HomePage;