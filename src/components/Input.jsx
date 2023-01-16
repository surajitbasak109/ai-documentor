import React from 'react';

const Input = ({ label, ...rest }) => {
  return (
    <>
      <label className="block font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        {...rest}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light shadow-sm"
      />
    </>
  );
};

export default Input;
