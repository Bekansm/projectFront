// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
			if (action.payload) {
				localStorage.setItem("token", action.payload);
			} else {
				localStorage.removeItem("token");
			}
		},
		logout: (state) => {
			state.token = null;
			localStorage.removeItem("token");
		},
	},
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
