import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ActivityTable from "./ActivityTable";

function ActivityAdd() {
  const location = useLocation();
  const id = location.state;
  console.log(id);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: id,
    date: "",
    email: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log(form);
      const response = await fetch(
        `http://localhost:4002/api/tasks/${id}/activities`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (response.ok) {
        console.log("Data successfully saved!");
        setForm({ date: "", email: "", description: "" }); // Reset form
        navigate(`/Table`);
        console.log(id);
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
        {/* Title changed to "Add Activity" */}
        <h2 className="text-2xl font-bold text-white mb-5 text-center tracking-wide">
          Add Activity
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* Date */}
        <div className="mb-5">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            id="date"
            className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            id="email"
            className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter You Email"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            id="description"
            className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter Description"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-all"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default ActivityAdd;
