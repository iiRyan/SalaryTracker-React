import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="space-y-4 text-white">
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-darkerGray text-sm py-3">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <Link to={'/'} className="flex-none text-xl font-semibold text-primaryText focus:outline-none focus:opacity-80" href="#">SalaryTracker</Link>
          <div className="sm:hidden">
            <button type="button" className="hs-collapse-toggle relative size-7 flex justify-center items-center gap-2 rounded-lg border border-gray-700 font-medium bg-gray-800 text-gray-400 shadow-sm align-middle hover:bg-gray-700/20 focus:outline-none focus:bg-gray-700/20 text-sm" id="hs-navbar-dark-collapse" aria-expanded="false" aria-controls="hs-navbar-dark" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-dark">
              <svg className="hs-collapse-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
              <svg className="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              <span className="sr-only">Toggle</span>
            </button>
          </div>
        </div>
        <div id="hs-navbar-dark" className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block" aria-labelledby="hs-navbar-dark-collapse">
          <div   className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            <Link to="/create" className="font-medium text-white focus:outline-none" href="#" aria-current="page">Add month</Link>
            <a className="font-medium text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500" href="#">Account</a>
            <a className="font-medium text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500" href="#">Work</a>
            <a className="font-medium text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500" href="#">Blog</a>
          </div>
        </div>
      </nav>
    </header>
  
   
  </div>
  );
}

export default Navbar;
