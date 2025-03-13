import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Error state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!form.password.trim()) {
      setError("Password is required");
      return;
    }  

    setError(""); // Clear error before making request

    try {
      const response = await axios.post(
        "http://localhost:4002/api/login",
        form
      );

      const data = await response.data; // Response JSON parse karein

      if (response.status !== 200) {
        throw new Error(data.message || "Failed to login");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("Token successfully saved!");
        setForm({ email: "", password: "" });
        navigate("/Table"); // Successful login ke baad navigate karein
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.message); // Server se aayi error message show karein
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
      <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 p-10 rounded-xl shadow-2xl max-w-md w-full">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
          Login
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/Signup"
              className="text-blue-600 hover:text-blue-800 transition duration-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

// const handleLogin = async (e) => {
//   e.preventDefault();

//   if (!form.email.trim()) {
//     setError("Email is required");
//     return;
//   }

//   if (!form.password.trim()) {
//     setError("Password is required");
//     return;
//   }

//   setError(""); // Clear error before making request

//   try {
//     const response = await fetch("http://localhost:4002/api/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(form),
//     });

//     const data = await response.json(); // Response JSON parse karein

//     if (!response.ok) {
//       throw new Error(data.message || "Failed to login"); // Backend se aaya error message dikhayein
//     }

//     if (data.token) {
//       localStorage.setItem("token", data.token);
//       console.log("Token successfully saved!");
//       setForm({ email: "", password: "" });
//       navigate("/Table"); // Successful login ke baad navigate karein
//     }
//   } catch (error) {
//     console.error("Login Error:", error);
//     setError(error.message); // Server se aayi error message show karein
//   }
// };
