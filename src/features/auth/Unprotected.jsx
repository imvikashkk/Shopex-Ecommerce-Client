/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from './authSlice';

function Unprotected({ children }) {
  const user = useSelector(selectLoggedInUser);

  if (user) {
    if(user?.role === 'admin') {
      return <Navigate to="/admin" replace={true}></Navigate>
    }
    else{
      <Navigate to="/admin" replace={true}></Navigate>
    }
  }
  return children;
}

export default Unprotected;