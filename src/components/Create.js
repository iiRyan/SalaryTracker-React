import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddMonthMutation } from "../store/apiSlice";
import { default as api } from "../store/apiSlice";
import {capitalizeFirstLetter} from "../helper/helper";

function Create() {
    const [values, setValues] = useState({
        month: "",
        income: {
          amount: "",
          description: "",
        },
      });
      
      const navigate = useNavigate();
      const [addMonth] = api.useAddMonthMutation();  // Use mutation hook
      
      const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
          // Create the transaction payload from values
          const initialTransaction = {
            month: values.month,
            description: values.description,
            amount: values.amount,
          };
      
          console.log(initialTransaction);
          await addMonth({ initialTransaction }).unwrap();  // Use mutation to post data
      
          console.log("Month added successfully");
          navigate("/");
      
        } catch (error) {
            const errorMessage = error?.data?.messages || "Something went wrong!";
          // Handle specific errors based on the server response
          if (error.status === 409) {
            alert(capitalizeFirstLetter(values.month) +" already exists.");
          } else if( error.status === 400) {
            alert(errorMessage);
          } 
          else {
            console.error("An error occurred:", error);
            alert("Something went wrong, please try again later.");
          }
        }
      };
      

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#18191A] to-[#28292b] px-4 py-8">
      <div className="w-full max-w-md bg-[#3A3B3C] border border-gray-700 p-8 rounded-lg shadow-lg">
        <h2 className="text-white text-3xl font-semibold mb-6 text-center">
          Add Month and Income
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <select
              id="month"
              name="month"
              value={values.month}
              onChange={(e) => setValues({ ...values, month: e.target.value })}
              className="block w-full bg-gray-800 text-white py-2 px-3 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="" disabled>
                Choose a month
              </option>
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="july">July</option>
              <option value="august">August</option>
              <option value="september">September</option>
              <option value="october">October</option>
              <option value="november">November</option>
              <option value="december">December</option>
            </select>
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="description"
              name="description"
              className="block w-full bg-gray-800 text-white py-2 px-3 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Enter income description"
              value={values.description}
              onChange={(e) => setValues({ ...values, description: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <input
              type="number"
              id="amount"
              name="amount"
              className="block w-full bg-gray-800 text-white py-2 px-3 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Enter income amount"
              value={values.amount}
              onChange={(e) => setValues({ ...values, amount: e.target.value })}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:from-blue-500 hover:to-purple-600 transition duration-300 ease-in-out"
            >
              Add Month
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
