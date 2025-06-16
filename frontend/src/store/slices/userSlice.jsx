import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axiosConfig";

const initialState = {
  data: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  error: false,
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const userRegister = createAsyncThunk(
  "user/register",
  async (userData) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, userData);
      // const data = await res.json();
      console.log("thunk", res);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    const res = await axios.get(
      `${BASE_URL}/users?email=${email}&password=${password}`
    );
    if (res.data.length > 0) {
      console.log("Login successful", res.data);
      const user = res.data[0];
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } else {
      return thunkAPI.rejectWithValue("Invalid credentials");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    // User registration
    builder.addCase(userRegister.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(userRegister.fulfilled, (state, action) => {
      console.log("user Register", action);
      state.isLoading = false;
    });

    builder.addCase(userRegister.rejected, (state, action) => {
      state.error = true;
      state.isLoading = false;
    });

    // User login
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log("user Login", action);
      state.data = action.payload;
      state.isLoading = false;
      state.error = false;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      console.error("Login error:", action.payload);
      state.isLoading = false;
      state.error = true;
    });
  },
});

// console.log(userSlice);

export const { logout } = userSlice.actions;
export default userSlice.reducer;
