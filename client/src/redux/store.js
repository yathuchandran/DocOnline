import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userData";
import doctorReducer from "./doctorData";
import adminReducer from "./adminData";
import scheduleReducer from "./doctorSchedule";
import selectedDocReducer from "./selectedDoc";
import appointmentReducer from "./appointment";
import consultReducer from "./consult";
import prescriptionData from "./prescriptionData";

import storage from "redux-persist/lib/storage"
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";


const persistConfig={
  key:'root',
  storage,
  version:1,
}
const reducer=combineReducers({
  user: userReducer,
  doctor: doctorReducer,
  admin: adminReducer,
  schedule: scheduleReducer,
  selectedDoc: selectedDocReducer,
  appointment: appointmentReducer,
  consult: consultReducer,
  prescription: prescriptionData,

})

const persistedReducer=persistReducer(persistConfig,reducer)
const store=configureStore({
  reducer:persistedReducer
})

export default store;

