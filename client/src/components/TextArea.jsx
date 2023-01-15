import React from 'react';

const TextArea = ({ label, placeholder, value, ...rest }) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900 capitalize dark:text-white"
      >
        {label}
      </label>
      <textarea
        rows="20"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        id={label}
        {...rest}
      ></textarea>
    </div>
  );
};

export default TextArea;
