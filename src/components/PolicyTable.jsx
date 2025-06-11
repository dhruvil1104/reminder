import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import { Link, useNavigate } from "react-router-dom"; // ✅ import

function PolicyTable() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [policies, setPolicies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicies = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const { data } = await axios.get(`${API_URL}/policies`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPolicies(data);
      } catch (error) {
        console.error("Error fetching policies:", error.message);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6">
        <Link to="/InsuranceForm">
          <button className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md">
            Add Policy
          </button>
        </Link>
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">📄 Policy Table</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border border-black">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 shadow-lg hover:shadow-xl">
                <th className="py-3 px-4 border border-black">No</th>
                <th className="py-3 px-4 border border-black">Policy Number</th>
                <th className="py-3 px-4 border border-black">Type</th>
                <th className="py-3 px-4 border border-black">
                  Coverage Amount
                </th>
                <th className="py-3 px-4 border border-black">Premium</th>
                <th className="py-3 px-4 border border-black">Start Date</th>
                <th className="py-3 px-4 border border-black">End Date</th>
                <th className="py-3 px-4 border border-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {policies.length > 0 ? (
                policies.map((policy, index) => (
                  <tr key={policy.id} className="text-center">
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border">{policy.policy_number}</td>
                    <td className="py-2 px-4 border">{policy.type}</td>
                    <td className="py-2 px-4 border">
                      ₹{policy.coverage_amount}
                    </td>
                    <td className="py-2 px-4 border">₹{policy.premium}</td>
                    <td className="py-2 px-4 border">
                      {new Date(policy.start_date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-2 px-4 border">
                      {new Date(policy.end_date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-2 px-4 border">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-semibold ${
                          policy.status === "Active"
                            ? "bg-green-200 text-green-700"
                            : "bg-red-200 text-red-700"
                        }`}
                      >
                        {policy.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-500">
                    No policies found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PolicyTable;
