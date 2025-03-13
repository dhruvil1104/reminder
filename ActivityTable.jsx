import axios from "axios";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ActivityTable() {
  const API_URL = import.meta.env.REACT_APP_API_URL;
  const params = useParams();
  const id = params.userId;

  const navigate = useNavigate();

  const [taskData, setTaskData] = useState(""); // Task data ke liye state
  const [userdata, setUserData] = useState([]); // Activities ke liye state

  const apiCall = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Redirecting to login.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:4002/api/tasks/${id}/activities`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status !== 200) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const obj = await response.data;
      console.log("API Response:", obj);

      setTaskData(obj);
      setUserData(obj.activities || []);
    } catch (error) {
      console.error("Error:", error);
      setTaskData(null);
      setUserData([]);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  const handleDoneClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Redirecting to login.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4002/api/tasks/${id}/done`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Task marked as done successfully!", response.data);

      // **Fresh data lane ke liye activities API ko dubara call karein**
      // apiCall();
      navigate(`/table`);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
    }
  };
  const isDisabled = taskData?.task_status === "done";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
        {taskData && (
          <div className="text-center py-6 mb-6 bg-gray-200 rounded-lg shadow-md">
            <p className="text-lg font-medium text-gray-800">
              <strong>ID:</strong> {taskData.taskid} |
              <strong> Description:</strong> {taskData.description} |
              <strong> Start Date:</strong>{" "}
              {DateTime.fromISO(taskData.startdate).toFormat("dd-MM-yyyy")} |
              <strong> End Date:</strong>{" "}
              {DateTime.fromISO(taskData.enddate).toFormat("dd-MM-yyyy")} |
              <strong> Email:</strong> {taskData.email}
            </p>
          </div>
        )}

        <Link to={`/ActivityAdd/${id}`} state={id} className="text-blue-50">
          <button className={`px-4 py-2 text-black rounded-lg ${isDisabled ? "bg-green-300 cursor-not-allowed" : "bg-green-500"}`} disabled = {isDisabled}>
            Add
          </button>
        </Link>

        <Link to={`/Assignto/${id}`} className="text-blue-50">
          <button className={`px-4 py-2 text-sm text-white ml-2 bg-blue-600  rounded-lg mr-2 ${isDisabled ? "to-blue-300 cursor-not-allowed" : "to-blue-600"}`} disabled={isDisabled}>
            Assign to
          </button>
        </Link>

        <button
          type="button"
          onClick={handleDoneClick}
          className={`px-4 py-2 text-sm text-white ml-0 bg-green-500  rounded-lg mr-2 ${isDisabled ? "bg-green-400 cursor-not-allowed" : "bg-green-600"}`} disabled={isDisabled}
        >
          Done
        </button>
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
                  <tr key={item.activityid}>
                    <td className="py-3 px-6">{index + 1}</td>
                    <td className="py-3 px-6">
                      {DateTime.fromISO(item.date).toFormat("dd-MM-yyyy")}
                    </td>
                    <td className="py-3 px-6">{item.email}</td>
                    <td className="py-3 px-6">{item.description}</td>
                    <td className="py-3 px-6 text-center">
                      <button className={`px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-600 rounded-lg mr-2${isDisabled ? "to-blue-500 cursor-not-allowed":"to-blue-600"}`} disabled={isDisabled}>
                        Edit
                      </button>
                      <button className={`px-4 py-2 text-sm ml-1 text-white bg-red-600 hover:bg-red-600 rounded-lg ${isDisabled ? "bg-red-400 cursor-not-allowed":"bg-red-600"}`}>
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
