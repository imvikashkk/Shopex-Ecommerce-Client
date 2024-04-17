/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { fetchLoggedInUserAsync } from "../user/userSlice";
import { useEffect } from "react";
import { selectUserInfo } from '../user/userSlice';

function Unprotected({ children }) {
  const user = localStorage.getItem("authorization");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("authorization")) {
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch]);
  const userInfo = useSelector(selectUserInfo)

  if (user) {
    if(userInfo === 'admin') {
      return <Navigate to="/admin" replace={true}></Navigate>
    }
    else{
      return <Navigate to="/" replace={true}></Navigate>
    }
  }

  return children;
}

export default Unprotected;