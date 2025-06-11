import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ActivityAdd() {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    task_id: Number(id),
    date: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(`${API_URL}/activities`, form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setForm({ task_id: Number(id), date: "", description: "" });
      navigate(`/ActivityTable/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2EFE7] to-[#9ACBD0] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-[#F2EFE7]/90 backdrop-blur-md shadow-2xl rounded-2xl p-10 space-y-6 border border-[#48A6A7]"
      >
        <h2 className="text-3xl font-semibold text-[#006A71] text-center tracking-wide">
          Add Activity
        </h2>

        {error && (
          <p className="text-red-600 text-center font-medium">{error}</p>
        )}

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            id="date"
            className="block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-[#48A6A7] focus:border-[#48A6A7] p-3"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            id="description"
            placeholder="Enter Description"
            className="block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-[#48A6A7] focus:border-[#48A6A7] p-3"
            rows={4}
            required
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-[#006A71] text-white px-6 py-3 rounded-xl hover:bg-[#04848A] transition shadow-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ActivityAdd;











// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// function ActivityAdd() {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const token = localStorage.getItem("token");
//   const params = useParams();
//   const id = params.id;
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     task_id: Number(id),
//     date: "",
//     description: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       await axios.post(`${API_URL}/activities`, form, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setForm({ task_id: Number(id), date: "", description: "" }); 
//       navigate(`/ActivityTable/${id}`);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to save data");
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
//         <h2 className="text-2xl font-bold text-white mb-5 text-center tracking-wide">
//           Add Activity
//         </h2>

//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

//         <div className="mb-5">
//           <label
//             htmlFor="date"
//             className="block text-sm font-medium text-gray-300 mb-2"
//           >
//             Date
//           </label>
//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//             id="date"
//             className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//           />
//         </div>

//         <div className="mb-5">
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-300 mb-2"
//           >
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             id="description"
//             className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//             placeholder="Enter Description"
//             required
//           />  
//         </div>

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
// }

// export default ActivityAdd;






















// import React, { useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// function ActivityAdd() {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const token = localStorage.getItem("token");
//   const params = useParams();
//   const id = params.id;
//   // console.log(id);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     task_id: Number(id),
//     date: "",

//     description: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   // ✅ Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(
//         `${API_URL}/activities`,
//         form,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(form);
//       if (response.status === 200 || response.status === 201) {
//         console.log("Data successfully saved!");
//         setForm({ date: "", email: "", description: "" }); // Reset form
//         navigate(`/ActivityTable/${id}`);
//         console.log(id);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setError(error.response?.data?.message || "Failed to save data");
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
//         <h2 className="text-2xl font-bold text-white mb-5 text-center tracking-wide">
//           Add Activity
//         </h2>

//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

//         {/* Date */}
//         <div className="mb-5">
//           <label
//             htmlFor="date"
//             className="block text-sm font-medium text-gray-300 mb-2"
//           >
//             Date
//           </label>
//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//             id="date"
//             className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
           
//           />
//         </div>

//         {/* Description */}
//         <div className="mb-5">
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-300 mb-2"
//           >
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             id="description"
//             className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//             placeholder="Enter Description"
//             required
//           />
//         </div>

//         {/* Submit Button */}
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
// }

// export default ActivityAdd;
