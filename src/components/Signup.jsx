import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [agreeToTerms, setAgreeToTerms] = useState(false); // Checkbox state
  const [error, setError] = useState(""); // Error message state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setAgreeToTerms(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!form.password.trim()) {
      setError("Password is required");
      return;
    }

    if (!agreeToTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setError(""); // Clear error before sending request

    try {
      const response = await fetch("http://localhost:4002/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const obj = await response.json();
        setUserData(obj);
        console.log("Data successfully saved!");
        setForm({ email: "", password: "" }); // Reset form
        setAgreeToTerms(false);
        // navigate("/Table");
      } else {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
      <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 p-10 rounded-xl shadow-2xl max-w-md w-full">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
          Sign Up
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
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

          {/* Checkbox for terms and conditions */}
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={agreeToTerms}
              onChange={handleCheckboxChange}
              className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="agreeToTerms" className="ml-2 text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                terms and conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="text-blue-600 hover:text-blue-800 transition duration-200"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
