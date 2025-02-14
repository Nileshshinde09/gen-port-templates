import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../store";
export type userDataType = {
  username: string;
  fullName: string;
  age: string;
  gender: boolean | null;
  isAdmin: boolean;
};
export interface UserState {
  userData: userDataType | null;
  AuthState: boolean;
}
const initialState: UserState = {
  userData: null,
  AuthState: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<userDataType>) => {
      state.AuthState = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.AuthState = false;
      state.userData = null;
    },
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;