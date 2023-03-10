import React from 'react';

const Card = ({ title, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="block p-6 mx-auto w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default Card;
