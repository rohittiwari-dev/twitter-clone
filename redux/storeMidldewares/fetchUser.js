import dataBase from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchUser = createAsyncThunk("fetchUser", async (email) => {
	try {
		const q = await query(
			collection(dataBase, "users"),
			where("email", "==", JSON.parse(JSON.stringify(email)))
		);
		const fetcheddata = await (
			await getDocs(q)
		).docs.map((document) => JSON.parse(JSON.stringify(document.data())));
		if (fetcheddata.length > 0) return fetcheddata[0];
	} catch (error) {
		console.log("🚀 ~ file: fetchUser.js:16 ~ fetchUser ~ error", error);
	}
});

export default fetchUser;
