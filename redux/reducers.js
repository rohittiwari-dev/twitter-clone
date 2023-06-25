import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./storeSlices/userSlice";

const reducers = combineReducers({
	logedinUser: userSlice.reducer,
});

export default reducers;
