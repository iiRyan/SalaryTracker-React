import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
        setMessage("Registered successfully!");
      } else {
        setMessage("Something went wrong: " + data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#18191A]">
      <div className="bg-[#242526] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Register
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-[#3A3B3C] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#3A3B3C] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#3A3B3C] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
              placeholder="Enter your password"
              required
            />
          </div>

          <p className="text-red-500 text-sm mb-4">{message}</p>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
