import { createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../requestMethod";
import Swal from "sweetalert2";

export const login = async (dispatch, user) => {
  try {
    const res = await userRequest.post("/user/login", user);
    await Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: res.data.message,
    });

    // Save user data to sessionStorage
    sessionStorage.setItem("user", JSON.stringify(res.data));

    dispatch(loginSuccess(res.data));
    return { success: true };
  } catch (err) {
    await Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: err.response.data.error,
    });

    dispatch(loginFailure());
    return { success: false };
  }
};

const initialUserData = JSON.parse(sessionStorage.getItem("user"));

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: initialUserData ? initialUserData : null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      sessionStorage.clear();
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
      window.location.href = "/";
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
