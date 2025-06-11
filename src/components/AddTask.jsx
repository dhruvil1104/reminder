import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTask = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    description: "",
    startdate: "",
    enddate: "",
    reminder: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const validateForm = () => {
    let errors = {};

    if (!form.description.trim()) {
      errors.description = "Description is required.";
    } else if (form.description.length < 3) {
      errors.description = "Description must be at least 3 characters long.";
    }

    if (!form.startdate) {
      errors.startdate = "Start date is required.";
    } else if (new Date(form.startdate) < new Date().setHours(0, 0, 0, 0)) {
      errors.startdate = "Start date cannot be in the past.";
    }

    if (!form.enddate) {
      errors.enddate = "End date is required.";
    } else if (new Date(form.enddate) <= new Date(form.startdate)) {
      errors.enddate = "End date must be after the start date.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError(null);

    try {
      await axios.post(`${API_URL}/tasks`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setForm({ description: "", startdate: "", enddate: "", reminder: false });
      navigate("/table");
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
          Add Task
        </h2>

        {error && (
          <p className="text-red-600 text-center font-medium">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Description
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-[#48A6A7] focus:border-[#48A6A7] p-3"
              placeholder="Enter Task Name"
              required
            />
            {validationErrors.description && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.description}
              </p>
            )}
          </div>

          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              name="reminder"
              checked={form.reminder}
              onChange={handleChange}
              className="w-5 h-5 text-[#006A71] border-gray-300 focus:ring-[#48A6A7] mr-3"
            />
            <label className="text-sm font-medium text-gray-700">
              Set Reminder
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startdate"
              value={form.startdate}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-[#48A6A7] focus:border-[#48A6A7] p-3"
              required
            />
            {validationErrors.startdate && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.startdate}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="enddate"
              value={form.enddate}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-[#48A6A7] focus:border-[#48A6A7] p-3"
              required
            />
            {validationErrors.enddate && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.enddate}
              </p>
            )}
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-[#006A71] text-white px-6 py-3 rounded-xl hover:bg-[#04848A] transition shadow-md"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;








// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AddTask = () => {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     description: "",
//     startdate: "",  
//     enddate: "",
//     reminder: false,
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({ ...form, [name]: type === "checkbox" ? checked : value });
//   };

//   const validateForm = () => {
//     let errors = {};

//     if (!form.description.trim()) {
//       errors.description = "Description is required.";
//     } else if (form.description.length < 3) {
//       errors.description = "Description must be at least 3 characters long.";
//     }

//     if (!form.startdate) {
//       errors.startdate = "Start date is required.";
//     } else if (new Date(form.startdate) < new Date().setHours(0, 0, 0, 0)) {
//       errors.startdate = "Start date cannot be in the past.";
//     }

//     if (!form.enddate) {
//       errors.enddate = "End date is required.";
//     } else if (new Date(form.enddate) <= new Date(form.startdate)) {
//       errors.enddate = "End date must be after the start date.";
//     }

//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // ✅ Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setLoading(true);
//     setError(null);

//     try {
//       await axios.post(`${API_URL}/tasks`, form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setForm({ description: "", startdate: "", enddate: "", reminder: false });
//       navigate("/table");
//     } catch (error) {
//       setError(error.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-900 flex items-center justify-center min-h-screen px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg"
//       >
//         <h2 className="text-2xl font-bold text-white mb-5 text-center">
//           Add Task
//         </h2>

//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

//         <div className="mb-5">
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-300 mb-2"
//           >
//             Description
//           </label>
//           <input
//             type="text"
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter Task Name"
//             required
//           />
//           {validationErrors.description && (
//             <p className="text-red-500 text-sm mt-1">
//               {validationErrors.description}
//             </p>
//           )}
//         </div>

//         <div className="mb-5">
//           <label
//             htmlFor="startdate"
//             className="block text-sm font-medium text-gray-300 mb-2"
//           >
//             Start Date
//           </label>
//           <input
//             type="date"
//             name="startdate"
//             value={form.startdate}
//             onChange={handleChange}
//             className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           {validationErrors.startdate && (
//             <p className="text-red-500 text-sm mt-1">
//               {validationErrors.startdate}
//             </p>
//           )}
//         </div>

//         <div className="mb-5">
//           <label
//             htmlFor="enddate"
//             className="block text-sm font-medium text-gray-300 mb-2"
//           >
//             End Date
//           </label>
//           <input
//             type="date"
//             name="enddate"
//             value={form.enddate}
//             onChange={handleChange}
//             className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           {validationErrors.enddate && (
//             <p className="text-red-500 text-sm mt-1">
//               {validationErrors.enddate}
//             </p>
//           )}
//         </div>

//         <label className="flex items-center text-white mb-3">
//           <input
//             type="checkbox"
//             name="reminder"
//             checked={form.reminder}
//             onChange={handleChange}
//             className="mr-3 w-5 h-5 text-blue-600 bg-gray-700 border-gray-600  focus:ring-blue-500"
//           />
//           Set Reminder
//         </label>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-all"
//           disabled={loading}
//         >
//           {loading ? "Saving..." : "Save"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddTask;















// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AddTask = () => {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     description: "",
//     startdate: "",
//     enddate: "",
//     reminder: false,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});

//   // ✅ Handle input changes
//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setForm({
//   //     ...form,
//   //     [name]: value,
//   //   });
//   // };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({ ...form, [name]: type === "checkbox" ? checked : value });
//   };

//   const validateForm = () => {
//     let errors = {};

//     if (!form.description.trim()) {
//       errors.description = "Description is required.";
//     } else if (form.description.length < 3) {
//       errors.description = "Description must be at least 3 characters long.";
//     }

//     if (!form.startdate) {
//       errors.startdate = "Start date is required.";
//     } else if (new Date(form.startdate) < new Date().setHours(0, 0, 0, 0)) {
//       errors.startdate = "Start date cannot be in the past.";
//     }

//     if (!form.enddate) {
//       errors.enddate = "End date is required.";
//     } else if (new Date(form.enddate) <= new Date(form.startdate)) {
//       errors.enddate = "End date must be after the start date.";
//     }

//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // ✅ Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(`${API_URL}/tasks`, form, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 201 || response.status === 200) {
//         setForm({ description: "", startdate: "", enddate: "" });
//         navigate("/table"); // ✅ Form save hone ke baad table page pe le jao
//       }
//     } catch (error) {
//       console.error("Error:", error.response?.data?.message || error.message);
//       setError(error.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-900 flex items-center justify-center min-h-screen px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg"
//       >
//         <h2 className="text-2xl font-bold text-white mb-5 text-center">
//           Add Task
//         </h2>

//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

//         <div className="mb-5">
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-300 mb-2"
//           >
//             Description
//           </label>
//           <input
//             type="text"
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter Task Name"
//             required
//           />
//           {validationErrors.description && (
//             <p className="text-red-500 text-sm mt-1">
//               {validationErrors.description}
//             </p>
//           )}
//         </div>

//         <div className="mb-5">
//           <label
//             htmlFor="startdate"
//             className="block text-sm font-medium text-gray-300 mb-2"
//           >
//             Start Date
//           </label>
//           <input
//             type="date"
//             name="startdate"
//             value={form.startdate}
//             onChange={handleChange}
//             className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           {validationErrors.startdate && (
//             <p className="text-red-500 text-sm mt-1">
//               {validationErrors.startdate}
//             </p>
//           )}
//         </div>

//         <div className="mb-5">
//           <label
//             htmlFor="enddate"
//             className="block text-sm font-medium text-gray-300 mb-2"
//           >
//             End Date
//           </label>
//           <input
//             type="date"
//             name="enddate"
//             value={form.enddate}
//             onChange={handleChange}
//             className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           {validationErrors.enddate && (
//             <p className="text-red-500 text-sm mt-1">
//               {validationErrors.enddate}
//             </p>
//           )}
//         </div>

//         <label className="flex items-center text-white mb-3">
//           <input
//             type="checkbox"
//             name="reminder"
//             checked={form.reminder}
//             onChange={handleChange}
//             className="mr-3 w-5 h-5 text-blue-600 bg-gray-700 border-gray-600  focus:ring-blue-500"
//           />
//           Set Reminder
//         </label>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-all"
//           disabled={loading}
//         >
//           {loading ? "Saving..." : "Save"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddTask;