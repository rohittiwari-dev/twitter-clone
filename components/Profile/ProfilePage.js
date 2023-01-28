import { tweets } from "@/data/staticData";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import Cover from "./Cover";
import { useRouter } from "next/router";
import Posts from "../Home/Posts";

const styles = {
	wrapper: `col-span-9  sm:col-span-7 lg:col-span-5 min-w-fit border-r will-change-scroll border-l border-[#38444d]/60 sticky top-0 h-screen min-h-full scroll-smooth scrollbar-hide overflow-y-auto`,
	headWrapper: `sticky right-0 left-0 bg-black/70 m-0  backdrop-contrast-75 backdrop-brightness-75   border-b border-[#38444d]/60  top-0 backdrop-blur z-10`,
	icon: `font-bold text-[1.2rem] rounded-full w-9 h-9 hover:bg-[#191919] flex justify-center items-center`,
};

const ProfilePage = () => {
	const router = useRouter();
	return (
		<div className={styles.wrapper}>
			{/* Head Section */}
			<div className={`${styles.headWrapper} flex gap-2 p-1 items-center`}>
				<span
					className={styles.icon}
					onClick={(e) => {
						e.preventDefault();
						router.push("/");
					}}
				>
					<IoArrowBack />
				</span>
				<div className="flex flex-col">
					<span className="text-xl font-semibold">Rohit Tiwari</span>
					<span className="text-sm">{tweets.length} Tweets</span>
				</div>
			</div>
			{/* Cover Section */}
			<Cover />
			{tweets.map((tweet, index) => (
				<Posts
					key={index}
					displayName={tweet.displayName}
					username={`${tweet.username.slice(0, 4)}...${tweet.username.slice(-4)}`}
					text={tweet.text}
					avatar={tweet.avatar}
					timestamp={tweet.timestamp}
					tweetmedia={tweet.media}
					isProfileImageNFT={tweet.isProfileImageNFT}
				/>
			))}
		</div>
	);
};

export default ProfilePage;
