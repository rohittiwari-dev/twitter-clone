import React, { useEffect, useState } from "react";
import { BsStars } from "react-icons/bs";
import TweetBox from "@/components/Home/TweetBox";
import Posts from "@/components/Home/Posts";
import dataBase from "@/utils/firebase";
import { collection, doc, getDocs } from "firebase/firestore";
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

const Feed = () => {
	const [feedtype, setFeedtype] = useState("foryou");
	const [tweetPost, setTweetPost] = useState([]);
	const [postOwners, setPostOwners] = useState([]);
	const [comments, setComments] = useState([]);
	const [likes, setLikes] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getPost = async () => {
			setLoading(true);
			const postsSnapshot = await getDocs(collection(dataBase, "posts"));
			setTweetPost(postsSnapshot.docs.map((doc) => doc.data()));
			const usersSnapshot = await getDocs(collection(dataBase, "users"));
			setPostOwners(usersSnapshot.docs.map((doc) => doc.data()));
			const commentsSnapshot = await getDocs(collection(dataBase, "comments"));
			setComments(commentsSnapshot.docs.map((doc) => doc.data()));
			const likesSnapshot = await getDocs(collection(dataBase, "likes"));
			await likesSnapshot.forEach((doc) => setLikes(doc.data()));
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
						className="w-full flex justify-center items-center h-[3rem] cursor-pointer hover:bg-[#191919]"
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
						className="w-full flex justify-center items-center h-[3rem] cursor-pointer hover:bg-[#191919]"
					>
						<span id={"againstyou"} className={styles.headerButton}>
							Against You
						</span>
					</div>
				</div>
			</div>

			<TweetBox />
			{!loading ? (
				tweetPost.map((tweet, index) => {
					const postOwner = postOwners.find((owner) => owner.customId === tweet.postOwer);

					return (
						<Posts
							key={index}
							displayName={postOwner?.firstName}
							username={postOwner?.customId}
							text={tweet?.tweetMessage}
							avatar={postOwner?.avatar}
							timestamp={tweet?.timestamp}
							tweetmedia={tweet?.tweetImage}
							likesCount={tweet?.likesCount}
							comentsCount={tweet?.comentsCount}
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
