import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Create() {
  // Update state to include the income object with 'amount' and 'title'
  const [values, setValues] = useState({
    month: "",
    income: {
      amount: "",
      title: "",
    },
  });

  const navigate = useNavigate();

  // Handle form submission and post the data
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:9080/expenses-tracker/api/months", values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="flex flex-col items-center bg-customBlack py-8 px-4 min-h-screen">
        <div className="w-full max-w-md bg-darkerGray p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Add Month and Income
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Month Selection */}
            <div className="mb-4">
             
              <select
                id="month"
                name="month"
                value={values.month}
                onChange={(e) =>
                  setValues({ ...values, month: e.target.value })
                }
                className="block w-full bg-gray-100 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled selected>
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

            {/* Income Title Input */}
            <div className="mb-4">
             
              <input
                type="text"
                id="income-title"
                name="income.title"
                className="block w-full bg-gray-100 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter income title"
                value={values.income.title}
                onChange={(e) =>
                  setValues({
                    ...values,
                    income: { ...values.income, title: e.target.value },
                  })
                }
              />
            </div>

            {/* Income Amount Input */}
            <div className="mb-6">
              
              <input
                type="number"
                id="income-amount"
                name="income.amount"
                className="block w-full bg-gray-100 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter income amount"
                value={values.income.amount}
                onChange={(e) =>
                  setValues({
                    ...values,
                    income: { ...values.income, amount: e.target.value },
                  })
                }
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Add Month
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
