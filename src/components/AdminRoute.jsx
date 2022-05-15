import React from "react";
import { loginStatus } from "../utils/helpers/loginStatus";
import { Outlet } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";

function AdminRoute() {
  if (loginStatus.setAuth()) return <Outlet />;
  return <ErrorPage code="403" title="Forbidden : You don't have permission to access this page" />;
}

export default AdminRoute;
