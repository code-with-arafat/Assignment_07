import React from 'react';
import FriendCard from './FriendCard';


const FriendsGrid = ({ friends }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <h3 className="text-2xl font-bold text-[#0F172A] mb-6">
        Your Friends
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {friends.map((friend) => (
          <FriendCard key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default FriendsGrid;