import Widget from "@/components/Home/Widget";
import ProfilePage from "@/components/Profile/ProfilePage";
import Sidebar from "@/components/sidebar/Sidebar";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const styles = {
	wrapper: `lg:max-w-7xl m-auto h-screen bg-[#00000] text-white overflow-hidden`,
	content: `grid grid-cols-9`,
};

const Profile = () => {
	const { data: session } = useSession();
	const router = useRouter();
	useEffect(() => {
		if (!session) router.push("/login");
	}, []);
	return (
		<>
			<Head>
				<title>Profile / Twitter</title>
				<meta charSet="UTF-8" />
				<link rel="shortcut icon" href="//abs.twimg.com/favicons/twitter.2.ico" />
				<meta
					name="viewport"
					content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
				/>
				<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
			</Head>
			<main className={styles.wrapper}>
				<div className={styles.content}>
					<Sidebar />
					<div className=" will-change-scroll grid grid-cols-9 col-span-9 sm:col-span-7 h-screen overflow-auto scroll-smooth scrollbar-hide">
						<ProfilePage />
						<Widget />
					</div>
				</div>
			</main>
		</>
	);
};

export default Profile;
