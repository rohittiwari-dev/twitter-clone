import dataBase from "@/utils/firebase";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { getSession, signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";

const Login = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const data = useSession();
	const [calledPush, setCalledPush] = useState(false);
	useEffect(() => {
		const registerUser = async () => {
			if (data.status === "authenticated") {
				const newUserSchema = {
					firstName: await data?.data?.user?.name?.split(" ")[0],
					lastName: await data?.data?.user?.name?.split(" ")[1],
					email: await data?.data?.user?.email,
					customId: `@${await data?.data?.user?.email?.split("@")[0]}`,
					followers: [],
					followings: [],
					avatar: await data?.data?.user?.image,
					nftVerified: false,
					tweets: [],
					verifiedNormal: false,
					timestamp: serverTimestamp(),
				};
				const q = query(
					collection(dataBase, "users"),
					where("email", "==", data?.data?.user?.email)
				);

				const user = await (await getDocs(q)).docs;
				if (user.length <= 0) {
					const newUserDoc = await addDoc(collection(dataBase, "users"), newUserSchema);
					if (newUserDoc) {
						alert("New User Registered With Id " + newUserDoc.id);
						return;
					}
				}
			}
		};
		const checklogin = async () => {
			const session = await getSession();
			if (!session) setLoading(false);
			else {
				if (calledPush) return;
				router.push("/");
				setCalledPush(true);
			}
		};
		checklogin();
		return function cleanup() {
			registerUser();
		};
	}, [data, calledPush]);

	return (
		<>
			<Head>
				<title>Home / Twitter</title>
				<meta charSet="UTF-8" />
				<link rel="shortcut icon" href="//abs.twimg.com/favicons/twitter.2.ico" />
				<meta
					name="viewport"
					content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
				/>
				<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
			</Head>
			<main className=" h-screen w-screen flex justify-center items-center">
				{!loading ? (
					<div
						className="w-40 h-10 font-bold bg-white text-cyan-900 text-center flex justify-center items-center cursor-pointer"
						onClick={() => {
							signIn("google");
						}}
					>
						<BsGoogle /> &nbsp;Google singIn
					</div>
				) : (
					<ImSpinner9 color={"#1DA1F2"} size="30" className="animate-spin" />
				)}
			</main>
		</>
	);
};

export default Login;
