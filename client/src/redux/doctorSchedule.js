import { createSlice } from "@reduxjs/toolkit";

const scheduleSlice = createSlice({
  name: "docSchedule",
  initialState: {
    schedule: "",
  },
  reducers: {
    setSchedule: (state, action) => {
      state.schedule = action.payload;
    },
  },
});
export const { setSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;
