/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { resetAuth } from "./authSlice";
import { Navigate } from 'react-router-dom';
import {resetUser, selectUserInfo} from "../user/userSlice"

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  useEffect(() => {
    dispatch(resetAuth());
    dispatch(resetUser())
    localStorage.clear();
  }, []);
  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default Logout;
