import React from 'react';
import { MdSearch } from 'react-icons/md';

const SearchBar = ({ value, onSubmitHandler, onChangeHandler }) => {
  return (
    <form onSubmit={onSubmitHandler} className="flex items-center">
      <div className="relative w-full">
        <div className="flex absolute inset-y-0 items-center pl-3 pointer-events-none lef-0">
          <MdSearch className='dark:text-white' />
        </div>
        <input
          type="search"
          id="sample-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
          value={value}
          onChange={onChangeHandler}
        />
      </div>
      <button
        type="submit"
        className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <MdSearch />
        <div className="sr-only">Search</div>
      </button>
    </form>
  );
};

export default SearchBar;
