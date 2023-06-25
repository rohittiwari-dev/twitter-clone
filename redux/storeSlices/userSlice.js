import { STATES } from "@/utils/enums";
import { createSlice } from "@reduxjs/toolkit";
import fetchUser from "../storeMidldewares/fetchUser";

const userSlice = createSlice({
	name: "logedinUser",
	initialState: {
		state: STATES.LOADING,
		data: [],
		msg: "",
	},
	reducers: {
		resetUserData: (state, action) => {
			state.data = [];
			state.msg = "";
			state.state = STATES.LOADING;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.pending, (state, action) => {
			state.state = STATES.LOADING;
		});
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.data = action.payload;
			state.msg = "Fetched Succefully";
			state.state = STATES.SUCCESS;
		});
		builder.addCase(fetchUser.rejected, (state, action) => {
			state.msg = "Something Went Wrong...";
			state.state = STATES.ERROR;
		});
	},
});

export default userSlice;
