import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DateTime } from "luxon";

function Table() {
  const [userdata, setUserData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch data from API
  const apiCall = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.error("No token found. Redirecting to login.");
      return; // Stop execution if token is missing
    }

    try {
      const response = await fetch("http://localhost:4002/api/tasks/user", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    apiCall();
  }, []); // Run only once on mount

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value === "1 Week") {
      setSearchParams({ f: 1 });
    } else if (value === "1 Month") {
      setSearchParams({ f: 2 });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex gap-2 mb-4">
          <Link to="/ResponsiveForm">
            <button className="px-4 py-2 text-black bg-green-500 hover:bg-green-600 rounded-lg">
              Add
            </button>
          </Link>

          {/* Static Dropdown Filter Button */}
          <div>
            <select
              onChange={handleFilterChange}
              className="px-4 py-2 bg-blue-500 text-black rounded-lg"
            >
              <option value="All">All</option>
              <option value="1 Week">1 Week</option>
              <option value="1 Month">1 Month</option>
            </select>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Tasks Table
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-3 text-left font-medium">No</th>
                <th className="py-3 px-3 text-left font-medium">Description</th>
                <th className="py-3 px-3 text-left font-medium">Start Date</th>
                <th className="py-3 px-3 text-left font-medium">End Date</th>
                <th className="py-3 px-3 text-left font-medium">
                  Days Remaining
                </th>
                <th className="py-3 px-3 text-left font-medium w-1/6">Email</th>
                <th className="py-3 px-3 text-center font-medium w-1/6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {userdata.length > 0 ? (
                userdata.map((item, index) => {
                  const startDate = DateTime.fromISO(item.startdate);
                  const endDate = DateTime.fromISO(item.enddate);
                  const today = DateTime.now();

                  // Calculate remaining days
                  const daysRemaining = Math.max(
                    endDate.diff(today, "days").days.toFixed(0),
                    0
                  );

                  return (
                    <tr key={item.id}>
                      <td className="py-3 px-3">{item.id}</td>
                      <td className="py-3 px-3">{item.description}</td>
                      <td className="py-3 px-3">
                        {startDate.toFormat("dd-MM-yyyy")}
                      </td>
                      <td className="py-3 px-3">
                        {endDate.toFormat("dd-MM-yyyy")}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`px-2 py-1 rounded-md text-sm font-semibold ${
                            daysRemaining === 0
                              ? "bg-red-500 text-black"
                              : daysRemaining <= 8
                              ? "bg-yellow-500 text-black"
                              : "bg-green-500 text-black"
                          }`}
                        >
                          {daysRemaining} days
                        </span>
                      </td>
                      <td className="py-3 px-3 w-1/6">{item.email}</td>
                      <td className="py-3 px-3 text-center w-1/6">
                        <div className="flex items-center justify-center gap-x-2">
                          <Link to={`/ActivityTable/${item.id}`} state={item}>
                            <button className="px-3 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg">
                              Activity
                            </button>
                          </Link>
                          <button className="px-3 py-2 text-sm text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg">
                            Edit
                          </button>
                          <button className="px-3 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">
                    No tasks found
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

export default Table;
