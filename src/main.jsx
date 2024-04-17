import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AlertComponent from "./features/alert/Alert.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <AlertComponent>
        <App />
      </AlertComponent>
  </Provider>
);
