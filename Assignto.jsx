import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Assignto = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  
  const token = localStorage.getItem("token");
  if (!token) return navigate("/login");

  const [form, setForm] = useState({ assigned_to_email: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(`${API_URL}/tasks/${id}/assign`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setForm({ assigned_to_email: "" });
      navigate("/Table");
    } catch (error) {
      setError(error.response?.data?.message || "Assigned user not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center min-h-screen px-4">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-white mb-5 text-center tracking-wide">
          Assign To
        </h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <div className="mb-5">
          <label htmlFor="assigned_to_email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            name="assigned_to_email"
            value={form.assigned_to_email}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter Assignee Email"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-all"
        >
          {loading ? "Assigning..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Assignto;
















// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const Assignto = () => {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const navigate = useNavigate();
//   const params = useParams();
//   const id = params.id;
//   console.log(id);
//   const token = localStorage.getItem("token");
//   console.log(token);
//   const [form, setForm] = useState({
//     assigned_to_email: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(form);

//     try {
//       // ✅ Yahan response ko sahi tarike se declare karna zaroori hai
//       const response = await axios.post(
//         `${API_URL}/tasks/${id}/assign`,
//         form,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("data", response.data); // ✅ response.data use karein
//       if (response.status === 200 || response.status === 201) {
//         console.log("Activity successfuly assigned");
//         setForm({ new_assigned_email: "" });
//         navigate("/Table");
//       }
//     } catch (error) {
//       console.error("Error creating post", error);
//     }
//   };

//   return (
//     <div className="bg-gray-900 flex items-center justify-center min-h-screen px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg"
//       >
//         <h2 className="text-2xl font-bold text-white mb-5 text-center tracking-wide">
//           Assignto
//         </h2>

//         {/* Email */}
//         <div className="mb-5">
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-300 mb-2"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             name="assigned_to_email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//             placeholder="Enter Your Email"
//             required
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-all"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Assignto;
