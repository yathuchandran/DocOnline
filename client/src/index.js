import React from 'react';
import ReactDOM from 'react-dom/client';
import "antd/dist/reset.css"
import './index.css';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from './redux/store.js'
import AuthProvider from './context/authContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
    <App />
    </AuthProvider>
    </Provider>

   
    
  </React.StrictMode>
);


