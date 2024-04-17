/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../user/userSlice';
import { fetchLoggedInUserAsync } from "../user/userSlice";
import { useEffect } from 'react';

function ProtectedAdmin({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("authorization")) {
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch]);
  const user = localStorage.getItem("authorization");
  const userInfo = useSelector(selectUserInfo)

  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (userInfo && userInfo.role!=='admin') {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return children;
}

export default ProtectedAdmin;