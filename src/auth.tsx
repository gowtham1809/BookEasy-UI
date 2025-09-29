import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, selectLoading } from "./redux/selector";
import { actions } from "./redux/reducer";

const AuthenticateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (!isAuthenticated) dispatch(actions.checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/login");
    }
  }, [isAuthenticated, loading]);

  return isAuthenticated ? <Outlet /> : null;
};

export default AuthenticateUser;
