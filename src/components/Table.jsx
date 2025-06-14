import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { DateTime } from "luxon";
import axios from "axios";
import { FaEdit, FaTrash, FaClipboardList } from "react-icons/fa";

function Table() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [userdata, setUserData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const { data } = await axios.get(
          `${API_URL}/tasks/user?f=${searchParams.get("f") || ""}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserData(data);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
      }
    };
    fetchData();
  }, [searchParams]);

  const handleFilterTasks = (e) => {
    const value = e.target.value;
    if (value === "1 Week") {
      setSearchParams({ f: 1 });
    } else if (value === "1 Month") {
      setSearchParams({ f: 2 });
    } else {
      setSearchParams({});
    }
  };

  const handleFilterScreen = (e) => {
    const value = e.target.value;
    if (value === "Admin") {
      navigate("/Table");
    } else if (value === "CreatedByMe") {
      navigate("/CreatedByMe");
    } else if (value === "AssignToMe") {
      navigate("/AssignToMe");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex gap-2 mb-4 justify-between">
          <div className="flex gap-2">
            <Link to="/addtask">
              <button className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md">
                Add Task
              </button>
            </Link>

            <select
              className="px-4 py-2 bg-purple-600 text-white rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={(e) => {
                const selectedCategory = e.target.value;
                if (selectedCategory === "AMC") {
                  navigate(`/AMC`);
                } else if (selectedCategory === "INSURANCE") {
                  navigate("/PolicyTable");
                }
              }}
            >
              <option value="" className="bg-white text-gray-700">
                Categories
              </option>
              <option value="MNC" className="bg-white text-gray-700">
                AMC 
              </option>
              <option value="INSURANCE" className="bg-white text-gray-700">
                INSURANCE
              </option>
            </select>
          </div>

          <div className="flex gap-3">
            <select
              onChange={handleFilterTasks}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md cursor-pointer"
            >
              <option value="All">All</option>
              <option value="1 Week">1 Week</option>
              <option value="1 Month">1 Month</option>
            </select>

            <select
              onChange={handleFilterScreen}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md cursor-pointer"
            >
              <option value="Admin">Admin</option>
              <option value="CreatedByMe">Created By Me</option>
              <option value="AssignToMe">Assign To Me</option>
            </select>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          📝 Tasks Table 
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-black">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 shadow-lg hover:shadow-xl ">
                <th className="py-3 px-4 border border-black">No</th>
                <th className="py-3 px-9 border border-black">Description</th>
                <th className="py-3 px-9 border border-black">Start Date</th>
                <th className="py-3 px-10 border border-black">End Date</th>
                <th className="py-3 px-4 border border-black">
                  Days Remaining
                </th>
                <th className="py-3 px-5 border border-black">CreatedBy</th>
                <th className="py-3 px-8 border border-black">AssignTo</th>{" "}
                <th className="py-3 px-9 border border-black">Status</th>{" "}
                <th className="py-3 px-3 border border-black">Reminder</th>
                <th className="py-3 px-14 border border-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userdata.length > 0 ? (
                userdata.map((item, index) => {
                  const startDate = DateTime.fromISO(item.startdate);
                  const endDate = DateTime.fromISO(item.enddate);
                  const today = DateTime.now();

                  const daysRemaining = Math.max(
                    endDate.diff(today, "days").days.toFixed(0),
                    0
                  );

                  return (
                    <tr key={item.id}>
                      <td className="py-3 px-5 font-semibold ">{index + 1}</td>
                      <td className="py-3 px-3 font-semibold">
                        {item.description}
                      </td>
                      <td className="py-3 px-3 font-semibold">
                        {startDate.toFormat("dd-MM-yyyy")}
                      </td>
                      <td className="py-3 px-3 font-semibold ">
                        {endDate.toFormat("dd-MM-yyyy")}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`px-2 py-1 rounded-md text-sm font-semibold transition duration-300 ease-in-out ${
                            daysRemaining === 0
                              ? "bg-red-200 text-red-700"
                              : daysRemaining <= 8
                              ? "bg-yellow-200 text-yellow-500"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {daysRemaining} days
                        </span>
                      </td>
                      <td className="py-3 px-1 font-semibold w-1/7">
                        {item.email}
                      </td>
                      <td className="py-3 px-2 font-semibold w-1/7">
                        {item.assigned_to_email}
                      </td>
                      <td className="py-3 px-3 w-1/6">
                        <span
                          className={`px-2 py-1 rounded-md text-sm font-semibold transition duration-300 ease-in-out ${
                            item.status === "done"
                              ? "bg-emerald-200 text-green-800 px-5"
                              : "bg-red-200 text-red-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-semibold">
                        {item.reminder ? (
                          <span className="bg-emerald-200 text-green-800 px-3 py-1 rounded-full text-sm">
                            Yes
                          </span>
                        ) : (
                          <span className="bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm">
                            No
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center w-1/6">
                        <div className="flex items-center justify-center gap-x-2">
                          <Link to={`/ActivityTable/${item.id}`} state={item}>
                            <button className="p-2 bg-blue-300 hover:bg-blue-400 text-blue-500 rounded-lg shadow-md">
                              <FaClipboardList />
                            </button>
                          </Link>
                          <button className="p-2 bg-yellow-300 hover:bg-yellow-400 text-yellow-600 rounded-lg shadow-md">
                            <FaEdit />
                          </button>
                          <button className="p-2 bg-red-300 hover:bg-red-400 text-red-600 rounded-lg shadow-md">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-500">
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

// Fetch data from API
// const apiCall = async () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     console.error("No token found. Redirecting to login.");
//     return;
//   }

//   try {
//     const response = await axios.get(
//       `${API_URL}/tasks/user?f=${searchParams.get("f") || ""}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     if (response.status !== 200) {
//       throw new Error(`API error: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.data;
//     console.log("API Response:", data);
//     setUserData(data);
//   } catch (error) {
//     console.error(
//       "Error fetching data:",
//       error.response ? error.response.data : error.message
//     );
//   }
// };

// useEffect(() => {
//   apiCall();
// }, [searchParams]);

// UI

// <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6">
//         <div className="flex gap-2 mb-4 ">
//           <Link to="/AddTask">
//             <button className="px-4 py-2 text-black bg-green-500 hover:bg-green-600 rounded-lg">
//               Add
//             </button>
//           </Link>

//           <div>
//             <select
//               onChange={handleFilterTasks}
//               className="px-4 py-2 bg-blue-500 text-black rounded-lg"
//             >
//               <option value="All">All</option>
//               <option value="1 Week">1 Week</option>
//               <option value="1 Month">1 Month</option>
//             </select>

//             <select
//               onChange={handleFilterScreen}
//               className="px-4 ml-3 py-2 bg-blue-500 text-black rounded-lg"
//             >
//               <option value="Admin">Admin</option>
//               <option value="CreatedByMe">Created By Me</option>
//               <option value="AssignToMe">Assign To Me</option>
//             </select>
//           </div>
//         </div>

//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Tasks Table
//         </h1>

//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-300 text-gray-700 text-left">
//                 <th className="py-3 px-4 border border-gray-400">No</th>
//                 <th className="py-3 px-9 border border-gray-400">
//                   Description
//                 </th>
//                 <th className="py-3 px-9 border border-gray-400">Start Date</th>
//                 <th className="py-3 px-9 border border-gray-400">End Date</th>
//                 <th className="py-3 px-4 border border-gray-400">
//                   Days Remaining
//                 </th>
//                 <th className="py-3 px-5 border border-gray-400">CreatedBy</th>
//                 <th className="py-3 px-8 border border-gray-400">
//                   AssignTo
//                 </th>{" "}
//                 <th className="py-3 px-4 border border-gray-400">Status</th>{" "}
//                 <th className="py-3 px-4 border border-gray-400">Reminder</th>
//                 <th className="py-3 px-14 border border-gray-400">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {userdata.length > 0 ? (
//                 userdata.map((item, index) => {
//                   const startDate = DateTime.fromISO(item.startdate);
//                   const endDate = DateTime.fromISO(item.enddate);
//                   const today = DateTime.now();

//                   const daysRemaining = Math.max(
//                     endDate.diff(today, "days").days.toFixed(0),
//                     0
//                   );

//                   return (
//                     <tr key={item.id}>
//                       <td className="py-3 px-3">{item.id}</td>
//                       <td className="py-3 px-3">{item.description}</td>
//                       <td className="py-3 px-3">
//                         {startDate.toFormat("dd-MM-yyyy")}
//                       </td>
//                       <td className="py-3 px-3">
//                         {endDate.toFormat("dd-MM-yyyy")}
//                       </td>
//                       <td className="py-3 px-3 text-center">
//                         <span
//                           className={px-2 py-1 rounded-md text-sm font-semibold ${
//                             daysRemaining === 0
//                               ? "bg-red-500 text-black"
//                               : daysRemaining <= 8
//                               ? "bg-yellow-500 text-black"
//                               : "bg-green-500 text-black"
//                           }}
//                         >
//                           {daysRemaining} days
//                         </span>
//                       </td>
//                       <td className="py-3 px-1 w-1/6">{item.email}</td>
//                       <td className="py-3 px-2 w-1/6">
//                         {item.assigned_to_email}
//                       </td>{" "}
//                       <td className="py-3 px-3 w-1/6">
//                         <span
//                           className={px-1 py-1 rounded-md text-sm  ${
//                             item.status === "done"
//                               ? "bg-green-500 text-black"
//                               : "bg-red-500 text-black"
//                           }}
//                         >
//                           {item.status}
//                         </span>
//                       </td>
//                       <td className="py-3 px-3 text-center">
//                         {item.reminder ? (
//                           <span className="bg-green-400 text-black px-2 py-1 rounded-md text-sm">
//                             Yes
//                           </span>
//                         ) : (
//                           <span className="bg-red-400 text-black px-2 py-1 rounded-md text-sm">
//                             No
//                           </span>
//                         )}
//                       </td>
//                       <td className="py-3 px-3 text-center w-1/6">
//                         <div className="flex items-center justify-center gap-x-2">
//                           <Link to={/ActivityTable/${item.id}} state={item}>
//                             <button className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md">
//                               <FaClipboardList />
//                             </button>
//                           </Link>
//                           <button className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-md">
//                             <FaEdit />
//                           </button>
//                           <button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md">
//                             <FaTrash />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="py-4 text-center text-gray-500">
//                     No tasks found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
