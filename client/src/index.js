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
import { SocketProvider } from "./context/socket/SocketProvider";
import Footer from "./components/Footer";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SocketProvider>
      <AuthProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
            <Footer />
          </PersistGate>
        </Provider>
      </AuthProvider>
    </SocketProvider>
  </React.StrictMode>
);
