import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import App from "./App";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import store from "./redux/store.js";
import AuthProvider from "./context/authContext";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
