/* eslint-disable react/prop-types */
// AlertComponent.js
import { useSelector, useDispatch } from "react-redux";
import { selectAlert, hideAlert } from "./alertSlice";
import Snackbar from "@mui/material/Snackbar";
import Slide from '@mui/material/Slide';


function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

function AlertComponent({children}) {
  const alert = useSelector(selectAlert);
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(hideAlert())
  };
 
  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={1000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        severity={alert.severity}
        message={alert.message}
      />

      <div>{children}</div>
    </div>
  );
}

export default AlertComponent;
