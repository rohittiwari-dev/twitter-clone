import Widget from "@/components/Home/Widget";
import ProfilePage from "@/components/Profile/ProfilePage";
import Sidebar from "@/components/sidebar/Sidebar";
import { fetchUsers, resetUserData } from "@/redux/reduxActions";
import { STATES } from "@/utils/enums";
import dataBase from "@/firebase";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const styles = {
	wrapper: `lg:max-w-7xl m-auto flex items-center justify-center h-screen bg-[#00000] text-white overflow-hidden`,
	content: `grid grid-cols-9`,
};

const ProfileDetails = () => {
	const router = useRouter();
	const profileId = "@" + router.query.profileId;
	const dispatch = useDispatch();
	const currentUserData = useSelector((state) => state.logedinUser.data);
	const [requestedUser, setRequestedUser] = useState(null);
	const { data: session } = useSession();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!currentUserData || currentUserData.length === 0) {
			const fetchUser = async () => await dispatch(fetchUsers(session.user.email));
			fetchUser();
		}
	}, [dispatch, session, currentUserData]);

	useEffect(() => {
		const getUser = async () => {
			const user = (
				await getDocs(query(collection(dataBase, "users"), where("customId", "==", profileId)))
			).docs[0].data();
			if (user) {
				await setRequestedUser(user);
				setLoading(false);
			}
		};
		getUser();
	}, [profileId]);
	return (
		<>
			{loading ? (
				<div className={styles.wrapper}>
					<ImSpinner9 color={"#1DA1F2"} size="30" className="text-center animate-spin" />
				</div>
			) : (
				<>
					<Head>
						<title>
							{requestedUser.firstName +
								" " +
								requestedUser.lastName +
								" (" +
								requestedUser.customId.replace("@", "") +
								") "}
							/ Twitter (Clone)
						</title>
						<meta charSet="UTF-8" />
						<link rel="shortcut icon" href="https://abs.twimg.com/favicons/twitter.2.ico" />
						<meta
							name="viewport"
							content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
						/>
						<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
					</Head>
					<main className={styles.wrapper}>
						<div className={styles.content}>
							<Sidebar
								user={currentUserData}
								activeLink={profileId === currentUserData.customId ? "Profile" : ""}
							/>
							<div className=" will-change-scroll grid grid-cols-9 col-span-9 sm:col-span-7 h-screen overflow-auto scroll-smooth scrollbar-hide">
								<ProfilePage
									user={requestedUser}
									userType={profileId === currentUserData.customId ? "owner" : null}
								/>
								<Widget />
							</div>
						</div>
					</main>
				</>
			)}
		</>
	);
};

export default ProfileDetails;

export async function getServerSideProps({ req }) {
	const session = await getSession({ req });
	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
	const userExist = await getDoc(doc(dataBase, "users", session.user.email));
	if (!userExist.exists()) {
		await setDoc(doc(dataBase, "users", session.user.email), {
			avatar: session.user.image,
			firstName: session.user.name.split(" ")[0],
			lastName: session.user.name.split(" ")[1],
			email: session.user.email,
			customId: `@${session.user.email.split("@")[0]}`,
			followers: [],
			followings: [],
			tweetsReplies: [],
			nftVerified: false,
			coverImage: "",
			timestamp: new Date(),
			tweets: [],
			verifiedNormal: false,
		});
	}
	return {
		props: {
			session,
		},
	};
}
