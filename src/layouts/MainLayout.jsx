// src/layouts/MainLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 px-4">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
