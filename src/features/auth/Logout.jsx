/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../../app/store";
import { resetAuth, selectLoggedInUser } from "./authSlice";
import { Navigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(resetAuth());
    localStorage.removeItem('authorization');
    persistor.pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });
  }, []);
  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default Logout;
