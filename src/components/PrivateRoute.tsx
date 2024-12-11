import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import history from "../helpers/history";
import { useAppSelector } from "../hooks/useAppSelector";

const PrivateRoute = () => {
  const auth = useAppSelector((x) => x.auth.token);

  if (!auth) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" state={{ from: history.location }} />;
  }

  // authorized so return outlet for child routes
  return <Outlet />;
};

export default PrivateRoute;
