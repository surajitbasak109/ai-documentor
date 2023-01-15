import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import DarkModeToggle from '../components/DarkModeToggle';
import Footer from '../components/Footer';
import NavButton from '../components/NavButton';
import Profile from '../components/Profile';
import { UserContext } from '../contexts/user.context';

const Navbar = () => {
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } =
    useContext(UserContext);
  const [dropdown, setDropdown] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleProfileDropdown = () =>
    setIsDropdownOpen(!isDropdownOpen);
  const toggleDropdown = () => setDropdown(!dropdown);
  const navigateToAuth = () => navigate('/login');
  const [mode, setMode] = useState('light');
  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };
  const logout = () => {
    setIsDropdownOpen(false);
    setAuthenticated(false);
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
    navigateToAuth();
  };

  useEffect(() => {
    mode === 'dark'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }, [mode]);

  return (
    <div className="flex overflow-scroll flex-col w-screen h-screen bg-white dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center px-2 max-w-full min-h-72 md:px-5">
        <Link to="/">
          <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-red-500">
            Documentor
          </span>
        </Link>
        <div className="flex md:order-2">
          <DarkModeToggle mode={mode} onClick={toggleMode} />
          {authenticated ? (
            <Profile onClick={toggleProfileDropdown} />
          ) : (
            <button
              onClick={navigateToAuth}
              className="px-3 py-1 mr-3 text-gray-100 bg-sky-500 rounded hover:bg-sky-600"
            >
              Login
            </button>
          )}
          <NavButton onClick={toggleDropdown} />
        </div>
        <div
          className={`w-full md:block md:w-auto ${
            dropdown ? '':'hidden'}`}
        >
          <div className="flex flex-col p-4 mt-4 bg-gray-300 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <Link
              to="/"
              className="text-lg dark:text-gray-50 hover:underline"
            >
              Home
            </Link>
            <Link
              to={'/about'}
              className="text-lg dark:text-gray-50 hover:underline"
            >
              About
            </Link>
            {authenticated && (
              <>
                <Link
                  to={'/func'}
                  className="text-lg dark:text-gray-50 hover:underline"
                >
                  Features
                </Link>
                <Link
                  to={'/documents'}
                  className="text-lg dark:text-gray-50 hover:underline"
                >
                  Documents
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className={`absolute right-0 top-12 z-50 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 ${
          isDropdownOpen ? '':'hidden'}`}
      >
        <button
          onClick={logout}
          className="w-full hover:bg-gray-500 hover:text-white dark:text-white"
        >
          Log out
        </button>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Navbar;
