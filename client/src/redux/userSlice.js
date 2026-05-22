import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    allUsers: [],
    allComponents: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setAllComponents: (state, action) => {
      state.allComponents = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export const { setAllUsers } = userSlice.actions;
export const { setAllComponents } = userSlice.actions;

export default userSlice.reducer;
