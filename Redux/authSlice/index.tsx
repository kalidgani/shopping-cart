import { auth } from "@/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from "firebase/auth";
import Cookies from "js-cookie";

export interface authType {
  isLoading: boolean;
  user: string;
  error: string;
}

export type user = {
  email: string;
  password: string;
};

export const signup = createAsyncThunk("auth/signup", async (user: user) => {
  const data = await createUserWithEmailAndPassword(
    auth,
    user?.email,
    user?.password
  );
  console.log(data);
});

export const login = createAsyncThunk("auth/login", async (user: user) => {
    const data = await signInWithEmailAndPassword(
      auth,
      user?.email,
      user?.password
    );
    if(data){
      Cookies.set('token', data.user?.accessToken)
      localStorage.setItem('active-user', JSON.stringify(user))
    }
    console.log(data);
  });

  export const logout = createAsyncThunk("auth/logout", async () => {
    const data = await signOut(
      auth
    );
    console.log(data);
  });

const initialState: authType = {
  isLoading: true,
  user: "",
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signup.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(signup.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(login.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(login.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.user = action.payload;
      });
      builder.addCase(login.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
