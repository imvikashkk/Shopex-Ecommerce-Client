/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchLoggedInUserAsync } from "../user/userSlice";
import { useEffect } from "react";

function Protected({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("authorization")) {
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch]);
  const user = localStorage.getItem("authorization");
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
}

export default Protected;
