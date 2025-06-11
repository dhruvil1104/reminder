import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InsuranceForm = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    policy_number: "",
    user_id: 1,
    type: "Auto",
    coverage_amount: "",
    premium: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post(`${API_URL}/policies`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/PolicyTable");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2EFE7] to-[#9ACBD0] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#F2EFE7]/90 backdrop-blur-md shadow-2xl rounded-2xl p-10 space-y-8 border border-[#48A6A7]"
      >
        <h2 className="text-3xl font-semibold text-[#006A71] text-center">
          Policy Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Policy Number
            </label>
            <input
              type="number"
              name="policy_number"
              value={formData.policy_number}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-[#48A6A7] focus:border-[#48A6A7] p-3"
              placeholder="Enter Policy Number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Policy Type
            </label>
            <select
            
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-[#48A6A7] focus:border-[#48A6A7] p-3"
            >
              <option value="Auto">Auto</option>
              <option value="Health">Health</option>
              <option value="Life">Life</option>
              <option value="Home">Home</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coverage Amount
            </label>
            <input
              type="number"
              name="coverage_amount"
              value={formData.coverage_amount}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-[#48A6A7] focus:border-[#48A6A7] p-3"
              placeholder="₹"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Premium
            </label>
            <input
              type="number"
              name="premium"
              value={formData.premium}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-[#48A6A7] focus:border-[#48A6A7] p-3"
              placeholder="₹"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-[#48A6A7] focus:border-[#48A6A7] p-3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-[#48A6A7] focus:border-[#48A6A7] p-3"
              required
            />
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-[#006A71] text-white px-6 py-3 rounded-xl hover:bg-[#04848A] transition shadow-md"
          >
            Save Policy
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsuranceForm;
