import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLightTheme: localStorage.getItem("isLight") === "true",
};

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.isLightTheme = !state.isLightTheme;
			localStorage.setItem("isLight", state.isLightTheme);
		},
	},
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
