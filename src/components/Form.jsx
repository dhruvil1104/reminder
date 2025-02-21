import { DateTime } from "luxon";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResponsiveForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    description: "",
    startdate: "",
    enddate: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};

    // Description validation
    if (!form.description.trim()) {
      errors.description = "Description is required.";
    } else if (form.description.length < 3) {
      errors.description = "Description must be at least 3 characters long.";
    }

    // Start Date validation
    if (!form.startdate) {
      errors.startdate = "Start date is required.";
    } else {
      const today = DateTime.now().startOf("day");
      const startDate = DateTime.fromISO(form.startdate).startOf("day");

      if (startDate < today) {
        errors.startdate = "Start date cannot be in the past.";
      }
    }

    // End Date validation
    if (!form.enddate) {
      errors.enddate = "End date is required.";
    } else if (new DateTime(form.enddate) <= new DateTime(form.startdate)) {
      errors.enddate = "End date must be after the start date.";
    }

    // Email validation
    if (!form.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Invalid email address.";
    }

    setValidationErrors(errors);
    // return Object.keys(errors).length === 0;
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4002/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        console.log("Data successfully saved!");
        setForm({ description: "", startdate: "", enddate: "", email: "" }); // Reset form
        navigate("/Table");
      } else {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-5 text-center tracking-wide">
          Add Task
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* Product Name */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            id="product_name"
            className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter Task Name"
            required
          />
          {validationErrors.description && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.description}
            </p>
          )}
        </div>

        {/* Start Date */}
        <div className="mb-5">
          <label
            htmlFor="startdate"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Start Date
          </label>
          <input
            type="date"
            name="startdate"
            value={form.startdate}
            onChange={handleChange}
            id="start_date"
            className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            required
          />
          {validationErrors.startdate && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.startdate}
            </p>
          )}
        </div>

        {/* End Date */}
        <div className="mb-5">
          <label
            htmlFor="enddate"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            End Date
          </label>
          <input
            type="date"
            id="end_date"
            name="enddate"
            value={form.enddate}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            required
          />
          {validationErrors.enddate && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.enddate}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            id="email"
            className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter Your Email"
          />
          {validationErrors.email && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.email}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-all"
          disabled={loading}
          onClick={(e) => {
            console.log(form);
          }}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ResponsiveForm;
