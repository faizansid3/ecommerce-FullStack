import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: storedUser || null,
  token: storedUser?.token || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const userData = {
        name: action.payload.name,
        email: action.payload.email,
        _id: action.payload._id,  // ✅ include user ID
        token: action.payload.token,
      };

      state.user = userData;
      state.token = userData.token;

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
