import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { Navbar } from "../components";
import { AuthContext } from "../context/AuthContext";

export const Layout = () => {
  return (
    // <div className="bg-[url('/backgroundImage.jpg')] min-h-screen">
    <div className="">
      <Navbar />
      <Outlet />
    </div>
  );
};

export const RequireAuthLayout = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;

  return (
    <div className="relative">
      <Navbar />
      <Outlet />
    </div>
  );
};
