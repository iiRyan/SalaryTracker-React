import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { default as api } from "../store/apiSlice";

function Navbar() {
  const { data, isFetching, isSuccess, isError, refetch } = api.useGetUserQuery();
  const [username, setUsername] = useState(""); // Local state to hold username
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); // Check if token exists

  const Logout = () => {
    window.localStorage.removeItem("token");
    setUsername(""); // Clear username on logout
    navigate("/login");
  };

  useEffect(() => {
    if (isLoggedIn) {
      refetch(); // Manually refetch the user data on login
    }
  }, [isLoggedIn, refetch]);

  useEffect(() => {
    if (isSuccess && data?.name) {
      setUsername(data.name); // Set username when data is successfully fetched
    }
  }, [isSuccess, data]);

  if(isLoggedIn){
    if (isFetching) {
        return <div>Loading...</div>;
      }
      if (isError) {
        return <div>Error loading data</div>;
      }
  }
  

  return (
    <div className="bg-gradient-to-r from-[#18191A] to-[#28292b] text-white shadow-lg">
      <header className="flex justify-between items-center w-full px-8 py-5 border-b border-gray-700">
        <Link
          to="/"
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 hover:from-blue-400 hover:to-purple-400 transition-all duration-500 ease-in-out"
        >
          SalaryTracker
        </Link>

        <nav className="flex items-center gap-8">
          {isLoggedIn && (
            <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 hover:from-blue-400 hover:to-purple-400 transition-all duration-500 ease-in-out pointer-events-none">
              Welcome {username}
            </p>
          )}
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 hover:from-blue-400 hover:to-purple-400 transition-all duration-500 ease-in-out"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 hover:from-blue-400 hover:to-purple-400 transition-all duration-500 ease-in-out"
              >
                Register
              </Link>
            </>
          )}

          {isLoggedIn && (
            <button
              onClick={Logout}
              className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 hover:from-blue-400 hover:to-purple-400 transition-all duration-500 ease-in-out"
            >
              Logout
            </button>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
