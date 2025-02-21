import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ResponsiveForm from "./components/Form";
import ActivityTable from "./components/ActivityTable";
import Table from "./components/table";
import ActivityAdd from "./components/ActivityAdd";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const router = createBrowserRouter([
    
    {
      path: "/",
      element: <Login />, // Default route
    },
    {
      path: "Login",
      element: <Login />, // Default route
    },
    {
      path: "Signup",
      element: <Signup />, // Default route
    },
    // {
    //   path: "/",
    //   element: <Table />, // Default route
    // },
    {
      path: "/table",
      element: <Table />,
    },
    {
      path: "/ResponsiveForm",
      element: <ResponsiveForm />,
    },
    {
      path: "/ActivityTable/:userId",
      element: <ActivityTable />, // Ensure this route matches your navigate path
    },
    {
      path: "/ActivityAdd/:id",
      element: <ActivityAdd />, // Ensure this route matches your navigate path
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
