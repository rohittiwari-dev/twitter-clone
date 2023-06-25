/* Imports of actions */
import userSlice from "./storeSlices/userSlice";
import fetchUser from "./storeMidldewares/fetchUser";

/* Generic Actions */
export const { resetUserData } = userSlice.actions;

/* Thunk Action Hooks */
export const fetchUsers = fetchUser;
