import React from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const DarkModeToggle = ({ mode, onClick }) => {
  return (
    <div className="flex flex-col items-center my-2 md:order-2">
      <button
        onClick={onClick}
        className="flex mr-3 text-sm bg-gray-50 rounded-full dark:bg-gray-900"
      >
        {mode === 'dark' ? (
          <MdDarkMode className="w-8 h-8 text-white" />
        ) : (
          <MdLightMode className="w-8 h-8" />
        )}
      </button>
    </div>
  );
};

export default DarkModeToggle;
