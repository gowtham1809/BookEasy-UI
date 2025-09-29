import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, selectLoading } from "./redux/selector";
import { actions } from "./redux/reducer";
import { LaptopOutlined } from "@ant-design/icons";

const AuthenticateUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(actions.checkAuth());
  }, [dispatch]);
  useEffect(() => {
    if (
      isAuthenticated &&
      (location.pathname === "/login" || location.pathname === "/")
    ) {
    } else if (!isAuthenticated && !loading) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, location.pathname, navigate]);

  if (loading) {
    return <LaptopOutlined />;
  }

  return isAuthenticated ? <Outlet /> : null;
};

export default AuthenticateUser;
