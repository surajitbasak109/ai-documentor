import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Profile = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center my-2 md:order-2">
      <button
        type="button"
        onClick={onClick}
        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      >
        <FaUserCircle className="w-8 h-8 text-white" />
      </button>
    </div>
  );
};

export default Profile;
