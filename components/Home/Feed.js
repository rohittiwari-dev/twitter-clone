import React, { useEffect, useState } from "react";
import { BsStars } from "react-icons/bs";
import TweetBox from "@/components/Home/TweetBox";
import Posts from "@/components/Home/Posts";
import dataBase from "@/utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { ImSpinner9 } from "react-icons/im";

const styles = {
	wrapper: `col-span-9 sm:col-span-7 lg:col-span-5  border-r will-change-scroll border-l border-[#38444d]/60 sticky top-0 h-screen min-h-full scroll-smooth scrollbar-hide overflow-y-auto`,
	headWrapper: `sticky right-0 left-0 bg-black/70 m-0 backdrop-contrast-75 backdrop-brightness-75 border-b border-[#38444d]/60  top-0 backdrop-blur z-10`,
	header: ` flex justify-between items-center p-3 pl-4`,
	headerTab: `flex justify-center items-center `,
	headerButton: `font-light text-ls`,
	headerButtonActive: `font-bold text-[0.95rem] flex justify-center items-center  w-full relative before:absolute before:top-[1.8rem] before:left-[25%] before:content-[''] before:w-[50%] before:h-[2px] before:bg-[#1d9bf0]`,
	headerTitle: `text-xl font-bold`,
};

const Feed = ({ user }) => {
	const [feedtype, setFeedtype] = useState("foryou");
	const [tweetPost, setTweetPost] = useState([]);
	const [postOwners, setPostOwners] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getPost = async () => {
			setLoading(true);
			await onSnapshot(
				query(collection(dataBase, "posts"), orderBy("timestamp", "desc")),
				async (snapshot) => setTweetPost(await snapshot.docs.map((doc) => doc.data()))
			);
			await onSnapshot(collection(dataBase, "users"), async (snapshot) =>
				setPostOwners(await snapshot.docs.map((doc) => doc.data()))
			);
			setLoading(false);
		};
		getPost();
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={styles.headWrapper}>
				<div className={styles.header}>
					<div className={styles.headerTitle}>Home</div>
					<BsStars />
				</div>
				<div className={styles.headerTab}>
					<div
						onClick={(e) => {
							e.currentTarget.childNodes[0].className = styles.headerButtonActive;
							setFeedtype("foryou");
							document.getElementById("againstyou").className = styles.headerButton;
						}}
						className="w-full flex justify-center items-center  transition-all   h-[3rem] cursor-pointer hover:bg-[#191919]"
					>
						<span id={"foryou"} className={styles.headerButtonActive}>
							For You
						</span>
					</div>
					<div
						onClick={(e) => {
							e.currentTarget.childNodes[0].className = styles.headerButtonActive;
							setFeedtype("againstyou");
							document.getElementById("foryou").className = styles.headerButton;
						}}
						className="w-full flex justify-center  transition-all   items-center h-[3rem] cursor-pointer hover:bg-[#191919]"
					>
						<span id={"againstyou"} className={styles.headerButton}>
							Against You
						</span>
					</div>
				</div>
			</div>

			<TweetBox user={user} />
			{!loading ? (
				tweetPost.map((tweet, index) => {
					const postOwner = postOwners.find((owner) => owner.email === tweet.postOwner);
					if (tweet && postOwner);
					return (
						<Posts
							key={index}
							tweetId={tweet.tweetId}
							displayName={postOwner?.firstName}
							username={postOwner?.customId}
							text={tweet?.tweetMessage}
							avatar={postOwner?.avatar}
							timestamp={tweet?.timestamp}
							tweetmedia={tweet?.tweetImage}
							likes={tweet.likes}
							likesCount={tweet?.likesCount}
							commentsCount={tweet?.commentsCount}
							isProfileImageNFT={postOwner?.nftVerified}
							isVerified={postOwner?.verifiedNormal}
						/>
					);
				})
			) : (
				<ImSpinner9
					color={"#1DA1F2"}
					size="30"
					className="text-center w-full mt-20 animate-spin"
				/>
			)}

			<div className={"flex flex-col justify-center items-center"}></div>
		</div>
	);
};

export default Feed;
