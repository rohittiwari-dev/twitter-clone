import React, { useState } from "react";
import { BsStars } from "react-icons/bs";
import TweetBox from "@/components/Home/TweetBox";
import Posts from "@/components/Home/Posts";
import { tweets } from "@/data/staticData";

const styles = {
	wrapper: `col-span-7 lg:col-span-5 min-w-fit border-r will-change-scroll border-l border-[#38444d] sticky top-0 h-screen min-h-full scroll-smooth scrollbar-hide overflow-y-auto`,
	headWrapper: `sticky right-0 left-0 bg-black/70 m-0 backdrop-contrast-75 backdrop-brightness-75 border-b border-[#38444d]  top-0 backdrop-blur z-10`,
	header: ` flex justify-between items-center p-3 pl-4`,
	headerTab: `flex justify-center items-center `,
	headerButton: `w-full text-center bg-transparent mb-1 hover:bg-[#191919]  p-3`,
	headerButtonActive: `font-medium w-full text-center hover:bg-[#191919] decoration-[0.2rem] p-3 bg-transparent underline underline-offset-[0.9rem] decoration-blue-400`,
	headerTitle: `text-xl font-bold`,
};

const Feed = () => {
	const [feedtype, setFeedtype] = useState("foryou");

	return (
		<div className={styles.wrapper}>
			<div className={styles.headWrapper}>
				<div className={styles.header}>
					<div className={styles.headerTitle}>Home</div>
					<BsStars />
				</div>
				<div className={styles.headerTab}>
					<button
						id={"foryou"}
						className={styles.headerButtonActive}
						onClick={(e) => {
							e.target.className = styles.headerButtonActive;
							setFeedtype("foryou");
							document.getElementById("againstyou").className = styles.headerButton;
						}}
					>
						For You
					</button>
					<button
						id={"againstyou"}
						className={styles.headerButton}
						onClick={(e) => {
							e.target.className = styles.headerButtonActive;
							setFeedtype("againstyou");
							document.getElementById("foryou").className = styles.headerButton;
						}}
					>
						Against You
					</button>
				</div>
			</div>

			<TweetBox />
			{tweets.map((tweet, index) => (
				<Posts
					key={index}
					displayName={tweet.displayName}
					username={`${tweet.username.slice(0, 4)}...${tweet.username.slice(-4)}`}
					text={tweet.text}
					avatar={tweet.avatar}
					timestamp={tweet.timestamp}
					isProfileImageNFT={tweet.isProfileImageNFT}
				/>
			))}

			<div className={"flex flex-col justify-center items-center"}></div>
		</div>
	);
};

export default Feed;
