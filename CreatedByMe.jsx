import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { DateTime } from "luxon";
import axios from "axios";
import { FaEdit, FaTrash, FaClipboardList } from "react-icons/fa";

function CreatedByMe() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [userdata, setUserData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const { data } = await axios.get(
          `${API_URL}/tasks/created?f=${searchParams.get("f") || ""}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTasks();
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
          <Link to="/AddTask">
            <button className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md">
              Add Task
            </button>
          </Link>

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
          🗂️ Tasks Table
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-500">
            <thead>
              <tr className="bg-gray-300 text-gray-800 text-left">
                <th className="py-3 px-4 border border-gray-500">No</th>
                <th className="py-3 px-9 border border-gray-500">
                  Description
                </th>
                <th className="py-3 px-9 border border-gray-500">Start Date</th>
                <th className="py-3 px-10 border border-gray-500">End Date</th>
                <th className="py-3 px-4 border border-gray-500">
                  Days Remaining
                </th>
                <th className="py-3 px-16 border border-gray-500 ">AssignTo</th>{" "}
                <th className="py-3 px-14 border border-gray-500">Status</th>{" "}
                <th className="py-3 px-4 border border-gray-500">Reminder</th>
                <th className="py-3 px-14 border border-gray-500">Actions</th>
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
                      <td className="py-3 px-3 font-semibold">{item.id}</td>
                      <td className="py-3 px-3 w-1/2 font-semibold">
                        {item.description}
                      </td>
                      <td className="py-3 px-3 font-semibold">
                        {startDate.toFormat("dd-MM-yyyy")}
                      </td>
                      <td className="py-3 px-3 font-semibold">
                        {endDate.toFormat("dd-MM-yyyy")}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`px-2 py-1 rounded-md text-sm font-semibold transition duration-300 ease-in-out ${
                            daysRemaining === 0
                              ? "bg-red-400 text-red-900"
                              : daysRemaining <= 8
                              ? "bg-yellow-400 text-yellow-900"
                              : "bg-green-400 text-green-900"
                          }`}
                        >
                          {daysRemaining} days
                        </span>
                      </td>

                      <td className="py-3 px-8  font-semibold">
                        {item.assigned_to_email}
                      </td>
                      <td className="py-3 px-9">
                        <span
                          className={`px-2 py-1 rounded-md text-sm font-semibold transition duration-300 ease-in-out ${
                            item.status === "done"
                              ? "bg-emerald-400 text-emerald-900 px-5"
                              : "bg-rose-400 text-rose-900"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-semibold">
                        {item.reminder ? (
                          <span className="bg-green-400 text-green-800 px-3 py-1 rounded-full text-sm">
                            Yes
                          </span>
                        ) : (
                          <span className="bg-red-400 text-red-800 px-3 py-1 rounded-full text-sm">
                            No
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center w-1/6">
                        <div className="flex items-center justify-center gap-x-2">
                          <Link to={`/ActivityTable/${item.id}`} state={item}>
                            <button className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md">
                              <FaClipboardList />
                            </button>
                          </Link>
                          <button className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-md">
                            <FaEdit />
                          </button>
                          <button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md">
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

export default CreatedByMe;

// import React, { useEffect, useState } from "react";
// import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
// import { DateTime } from "luxon";
// import axios from "axios";
// import { FaEdit, FaTrash, FaClipboardList } from "react-icons/fa";

// function CreatedByMe() {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const navigate = useNavigate();
//   const [userdata, setUserData] = useState([]);
//   const [searchParams, setSearchParams] = useSearchParams();

//   // Fetch data from API
//   const apiCall = async () => {
//     const token = localStorage.getItem("token");
//     console.log(token);
//     if (!token) {
//       console.error("No token found. Redirecting to login.");
//       return; // Stop execution if token is missing
//     }

//     try {
//       const response = await axios.get(
//         `${API_URL}/tasks/created?f=${
//           searchParams.get("f") || ""
//         }`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status !== 200) {
//         throw new Error(`API error: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.data;
//       console.log("API Response:", data);
//       setUserData(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     apiCall();
//   }, [searchParams]); // Run only once on mount

//   const handleFilterTasks = (e) => {
//     const value = e.target.value;
//     if (value === "1 Week") {
//       setSearchParams({ f: 1 });
//     } else if (value === "1 Month") {
//       setSearchParams({ f: 2 });
//     } else {
//       setSearchParams({});
//     }
//   };

//   const handleFilterScreen = (e) => {
//     const value = e.target.value;
//     if (value === "Admin") {
//       navigate("/Table");
//     } else if (value === "CreatedByMe") {
//       navigate("/CreatedByMe");
//     } else if (value === "AssignToMe") {
//       navigate("/AssignToMe");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//           <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6">
//             <div className="flex gap-2 mb-4 justify-between">
//               <Link to="/AddTask">
//                 <button className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md">
//                   Add Task
//                 </button>
//               </Link>

//               <div className="flex gap-3">
//                 <select
//                   onChange={handleFilterTasks}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md cursor-pointer"
//                 >
//                   <option value="All">All</option>
//                   <option value="1 Week">1 Week</option>
//                   <option value="1 Month">1 Month</option>
//                 </select>

//                 <select
//                   onChange={handleFilterScreen}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md cursor-pointer"
//                 >
//                   <option value="Admin">Admin</option>
//                   <option value="CreatedByMe">Created By Me</option>
//                   <option value="AssignToMe">Assign To Me</option>
//                 </select>
//               </div>
//             </div>

//             <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//               Tasks Table
//             </h1>

//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse border border-gray-300">
//                 <thead>
//                   <tr className="bg-gray-300 text-gray-700 text-left">
//                     <th className="py-3 px-4 border border-gray-400">No</th>
//                     <th className="py-3 px-9 border border-gray-400">
//                       Description
//                     </th>
//                     <th className="py-3 px-9 border border-gray-400">Start Date</th>
//                     <th className="py-3 px-9 border border-gray-400">End Date</th>
//                     <th className="py-3 px-4 border border-gray-400">
//                       Days Remaining
//                     </th>

//                     <th className="py-3 px-8 border border-gray-400 ">
//                       AssignTo
//                     </th>{" "}
//                     <th className="py-3 px-8 border border-gray-400">Status</th>{" "}
//                     <th className="py-3 px-4 border border-gray-400">Reminder</th>
//                     <th className="py-3 px-14 border border-gray-400">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {userdata.length > 0 ? (
//                     userdata.map((item, index) => {
//                       const startDate = DateTime.fromISO(item.startdate);
//                       const endDate = DateTime.fromISO(item.enddate);
//                       const today = DateTime.now();

//                       const daysRemaining = Math.max(
//                         endDate.diff(today, "days").days.toFixed(0),
//                         0
//                       );

//                       return (
//                         <tr key={item.id}>
//                           <td className="py-3 px-3">{item.id}</td>
//                           <td className="py-3 px-3">{item.description}</td>
//                           <td className="py-3 px-3">
//                             {startDate.toFormat("dd-MM-yyyy")}
//                           </td>
//                           <td className="py-3 px-3">
//                             {endDate.toFormat("dd-MM-yyyy")}
//                           </td>
//                           <td className="py-3 px-3 text-center">
//                             <span
//                               className={`px-2 py-1 rounded-md text-sm font-semibold ${
//                                 daysRemaining === 0
//                                   ? "bg-red-500 text-black"
//                                   : daysRemaining <= 8
//                                   ? "bg-yellow-500 text-black"
//                                   : "bg-green-500 text-black"
//                               }`}
//                             >
//                               {daysRemaining} days
//                             </span>
//                           </td>

//                           <td className="py-3 px-2 w-1/6">
//                             {item.assigned_to_email}
//                           </td>
//                           <td className=" py-1 px-4 ">
//                             <span
//                               className={`px-1 py-1 rounded-md text-sm  ${
//                                 item.status === "done"
//                                   ? "bg-green-500 text-black"
//                                   : "bg-red-500 text-black"
//                               }`}
//                             >
//                               {item.status}
//                             </span>
//                           </td>
//                           <td className="py-3 px-3 text-center">
//                             {item.reminder ? (
//                               <span className="bg-green-400 text-black px-2 py-1 rounded-md text-sm">
//                                 Yes
//                               </span>
//                             ) : (
//                               <span className="bg-red-400 text-black px-2 py-1 rounded-md text-sm">
//                                 No
//                               </span>
//                             )}
//                           </td>
//                           <td className="py-3 px-3 text-center w-1/6">
//                             <div className="flex items-center justify-center gap-x-2">
//                               <Link to={`/ActivityTable/${item.id}`} state={item}>
//                                 <button className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md">
//                                   <FaClipboardList />
//                                 </button>
//                               </Link>
//                               <button className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-md">
//                                 <FaEdit />
//                               </button>
//                               <button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md">
//                                 <FaTrash />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td colSpan="8" className="py-4 text-center text-gray-500">
//                         No tasks found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//   );
// }

// export default CreatedByMe;

// return (
//   <div className="flex items-center justify-center min-h-screen bg-gray-100">
//     <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
//       <div className="flex gap-2 mb-4">
//         <Link to="/ResponsiveForm">
//           <button className="px-4 py-2 text-black bg-green-500 hover:bg-green-600 rounded-lg">
//             Add
//           </button>
//         </Link>

//         <div>
//           <select
//             onChange={handleFilterTasks}
//             className="px-4 py-2 bg-blue-500 text-black rounded-lg"
//           >
//             <option value="All">All</option>
//             <option value="1 Week">1 Week</option>
//             <option value="1 Month">1 Month</option>
//           </select>

//           <select
//             onChange={handleFilterScreen}
//             //   defaultValue="Admin"
//             className="px-4 ml-3 py-2 bg-blue-500 text-black rounded-lg"
//           >
//             <option value="Admin">Admin</option>
//             <option value="CreatedByMe">Created By Me</option>
//             <option value="AssignToMe">Assign To Me</option>
//           </select>
//         </div>
//       </div>

//       <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//         Tasks Table
//       </h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto border-collapse">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700">
//               <th className="py-3 px-3 text-left font-medium">No</th>
//               <th className="py-3 px-3 text-left font-medium">Description</th>
//               <th className="py-3 px-10 text-left font-medium">Start Date</th>
//               <th className="py-3 px-10 text-left font-medium">End Date</th>
//               <th className="py-3 px-3 text-left font-medium">
//                 Days Remaining
//               </th>
//               {/* <th className="py-3 px-3 text-left font-medium w-1/6">
//                 CreatedBy
//               </th> */}
//               <th className="py-3 px-10 text-left font-medium w-1/6">
//                 AssignTo
//               </th>{" "}
//               <th className="py-3 px-3 text-left font-medium w-1/6">
//                 Status
//               </th>
//               <th className="py-3 px-3 text-center font-medium w-1/6">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {userdata.length > 0 ? (
//               userdata.map((item, index) => {
//                 const startDate = DateTime.fromISO(item.startdate);
//                 const endDate = DateTime.fromISO(item.enddate);
//                 const today = DateTime.now();

//                 // Calculate remaining days
//                 const daysRemaining = Math.max(
//                   endDate.diff(today, "days").days.toFixed(0),
//                   0
//                 );

//                 return (
//                   <tr key={item.id}>
//                     <td className="py-3 px-3">{item.id}</td>
//                     <td className="py-3 px-3">{item.description}</td>
//                     <td className="py-3 px-3">
//                       {startDate.toFormat("dd-MM-yyyy")}
//                     </td>
//                     <td className="py-3 px-3">
//                       {endDate.toFormat("dd-MM-yyyy")}
//                     </td>
//                     <td className="py-3 px-3 text-center">
//                       <span
//                         className={`px-2 py-1 rounded-md text-sm font-semibold ${
//                           daysRemaining === 0
//                             ? "bg-red-500 text-black"
//                             : daysRemaining <= 8
//                             ? "bg-yellow-500 text-black"
//                             : "bg-green-500 text-black"
//                         }`}
//                       >
//                         {daysRemaining} days
//                       </span>
//                     </td>
//                     <td className="py-3 px-3 w-1/6">
//                       {item.assigned_to_email}
//                     </td>
//                     <td className="py-3 px-3 w-1/6">
//                       <span
//                         className={`px-2 py-1 rounded-md text-sm  ${
//                           item.status === "done"
//                             ? "bg-green-500 text-black"
//                             : "bg-red-500 text-black"
//                         }`}
//                       >
//                         {item.status}
//                       </span>
//                     </td>

//                     <td className="py-3 px-3 text-center w-1/6">
//                       <div className="flex items-center justify-center gap-x-2">
//                         <Link to={`/ActivityTable/${item.id}`} state={item}>
//                           <button className="px-3 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg">
//                             Activity
//                           </button>
//                         </Link>
//                         <button className="px-3 py-2 text-sm text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg">
//                           Edit
//                         </button>
//                         <button className="px-3 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg">
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan="8" className="py-4 text-center text-gray-500">
//                   No tasks found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
// );
