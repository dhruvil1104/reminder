import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ActivityTable from "./components/ActivityTable";
import Table from "./components/Table";
import ActivityAdd from "./components/ActivityAdd";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Assignto from "./components/Assignto";
import AssignToMe from "./components/AssignToMe";
import CreatedByMe from "./components/CreatedByMe";
import AddTask from "./components/AddTask";
import MainLayout from "./layouts/MainLayout";
import Categories from "./components/Categories";
import InsuranceForm from "./components/InsuranceForm";
import PolicyTable from "./components/PolicyTable";
import DataGridPremiumDemo from "./components/TableUI";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/InsuranceForm",
      element: <InsuranceForm />,
    },
    {
      path: "/PolicyTable",
      element: <PolicyTable />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/DataGridPremiumDemo",
      element: <DataGridPremiumDemo />,
    },
    {
      path: "AddTask",
      element: <AddTask />,
    },
    {
      path: "ActivityAdd/:id",
      element: <ActivityAdd />,
    },

    {
      path: "Assignto/:id",
      element: <Assignto />,
    },

    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "table",
          element: <Table />,
        },
        {
          path: "Categories",
          element: <Categories />,
        },

        {
          path: "ActivityTable/:userId",
          element: <ActivityTable />,
        },

        {
          path: "CreatedByMe",
          element: <CreatedByMe />,
        },
        {
          path: "AssignToMe",
          element: <AssignToMe />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
