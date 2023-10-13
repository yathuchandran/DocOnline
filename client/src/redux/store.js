import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userData";
import doctorReducer from "./doctorData";
import adminReducer from "./adminData";
import scheduleReducer from "./doctorSchedule";
import selectedDocReducer from "./selectedDoc";
import appointmentReducer from "./appointment";

import storage from "redux-persist/lib/storage"
// import {persistReducer}from 'redux-persist'
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig={
  key:'root',
  storage,
  version:1,
}
const reducer=combineReducers({
  user: userReducer,
  doctor: doctorReducer,
  admin: adminReducer,
  docSchedule: scheduleReducer,
  selectedDoc: selectedDocReducer,
  appointment: appointmentReducer,
})

const persistedReducer=persistReducer(persistConfig,reducer)
const store=configureStore({
  reducer:persistedReducer
})

export default store;