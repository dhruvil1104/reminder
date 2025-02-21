import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function ActivityTable() {
  const location = useLocation();
  const id = location.state.id;
  const startdate = location.state.startdate;
  const enddate = location.state.enddate;
  const email = location.state.email;
  const description = location.state.description;

  const [userdata, setUserData] = useState([]);

  const apiCall = async () => {
    try {
      const response = await fetch(
        `http://localhost:4002/api/tasks/${id}/activities`, // URL fixed
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
        }
      );
      const obj = await response.json();
      console.log(obj);
      setUserData(Array.isArray(obj.activities) ? obj.activities : []); // activities ko properly extract kiya
    } catch (error) {
      console.error("Error:", error);
      setUserData([]);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
        <div className="text-center py-6 mb-6 bg-gray-200 rounded-lg shadow-md">
          <p className="text-lg font-medium text-gray-800">
            <strong>ID:</strong> {id} | <strong>Description:</strong>{" "}
            {description} |<strong>Start Date:</strong>{" "}
            {new Date(startdate).toLocaleDateString()} |
            <strong>End Date:</strong> {new Date(enddate).toLocaleDateString()}{" "}
            |<strong>Email:</strong> {email}
          </p>
        </div>

        <Link to={`/ActivityAdd/${id}`} state={id} className="text-blue-50">
          <button className="px-4 py-2 text-black bg-green-500 hover:bg-green-600 rounded-lg">
            Add
          </button>
        </Link>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Activity
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-6 text-left font-medium">No</th>
                <th className="py-3 px-6 text-left font-medium">Date</th>
                <th className="py-3 px-6 text-left font-medium">Email</th>
                <th className="py-3 px-6 text-left font-medium">Description</th>
                <th className="py-3 px-6 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userdata.length > 0 ? (
                userdata.map((item, index) => (
                  <tr key={item.id}>
                    <td className="py-3 px-6">{index + 1}</td>
                    <td className="py-3 px-6">
                      {DateTime.fromISO(item.date).toFormat("dd-MM-yyyy")}
                    </td>
                    <td className="py-3 px-6">{item.email}</td>
                    <td className="py-3 px-6">{item.description}</td>
                    <td className="py-3 px-6 text-center">
                      <button className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg mr-2">
                        Edit
                      </button>
                      <button className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No Data
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

export default ActivityTable;
