import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/server";
import { AsyncStorage } from "react-native";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    console.log(email, password);
    const result = await api.post("/customer/login", { email, password });
    if (result.data.message === "invalid email")
      throw new Error("invalid email");
    await AsyncStorage.setItem("token", result.headers.token);
    await AsyncStorage.setItem("id", result.data._id);

    return { user: result.data, token: result.headers.token };
  }
);
export const SignInAsync = createAsyncThunk(
  "auth/register",
  async ({ email, password, username }) => {
    console.log(email, password);
    const result = await api.post("/customer/register", {
      email,
      password,
      username,
    });
    if (result.data.message === "invalid email")
      throw new Error("invalid email");
    await AsyncStorage.setItem("token", result.headers.token);
    await AsyncStorage.setItem("id", result.data._id);

    return { user: result.data, token: result.headers.token };
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: "",
    loading: false,
    erorrMessage: "",
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = "";
      AsyncStorage.clear();
    },
  },
  extraReducers: {
    [SignInAsync.fulfilled]: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
    },
    [loginAsync.fulfilled]: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
      state.loading = false;
    },
    [loginAsync.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [loginAsync.rejected]: (state, { payload }) => {
      console.log("rejected");
      state.loading = false;
    },
    [SignInAsync.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [SignInAsync.rejected]: (state, { payload }) => {
      console.log("rejected");
      state.loading = false;
    },
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
