import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "boxicons";
import Navbar from './Navbar'; 

function Home() {
  const [data, setData] = useState([]);

  // Function to fetch months data from the backend
  const fetchData = () => {
    axios
      .get("http://localhost:9080/expenses-tracker/api/months")
      .then((res) => {
        setData(res.data); // res.data is an array of months
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData(); // Fetch months on component mount
  }, []);

  // Utility function to capitalize the first letter of a string safely
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Function to handle delete action
  const handleDelete = (id) => {
    // Send a DELETE request to the backend
    axios
      .delete(`http://localhost:9080/expenses-tracker/api/months/${id}`)
      .then((res) => {
        console.log("Deleted:", id);
        // Refetch the data from the backend after deletion
        fetchData();
      })
      .catch((err) => {
        console.error("Error deleting month:", err);
      });
  };
  return (
    <div>
      <div className="max-w-screen-md mx-auto  h-screen flex items-center justify-center">
        <div className="p-10 w-full rounded-xl space-y-7">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-3xl font-semibold">Months List</h1>
            <Link
              to="/create"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Add Month
            </Link>
          </div>

          <div className="relative w-full bg-white shadow-md rounded-xl overflow-x-auto">
            <table className="w-full text-left table-auto min-w-max bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 border-b">#</th>
                  <th className="p-4 border-b">Month</th>
                  <th className="p-4 border-b">Income</th>
                  <th className="p-4 border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((monthData, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-4 border-b">{index + 1}</td>
                    <td className="p-4 border-b">
                      {capitalizeFirstLetter(monthData.month)}
                    </td>
                    <td className="p-4 border-b">
                      {monthData.income?.amount || "No income"}
                    </td>
                    <td className="p-4 border-b text-right">
                      <div className="inline-flex space-x-2">
                        {/* View Details Button */}
                        <Link
                          to={`/read/${monthData.month}`}
                          className=" text-white font-medium py-1 px-3 text-sm   hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                          <box-icon
                            name="search"
                            className="h-4 w-4 mr-2 text-red-600"
                          />
                        </Link>

                        {/* Delete Button with Bin Icon */}
                        <button
                          className=" text-red-600 font-medium py-1 px-3 text-sm   hover:bg-red-200 transition duration-300 ease-in-out flex items-center"
                          onClick={() => handleDelete(monthData.id)}
                        >
                          <box-icon
                            name="trash"
                            className="h-4 w-4 mr-2 text-red-600"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
      
    </div>
  );
}

export default Home;
