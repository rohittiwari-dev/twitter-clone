import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Cover from "./Cover";
import { useRouter } from "next/router";
import Posts from "../Home/Posts";
import { collection, onSnapshot } from "firebase/firestore";
import dataBase from "@/utils/firebase";
import { ImSpinner9 } from "react-icons/im";

const styles = {
	wrapper: `col-span-9  sm:col-span-7 lg:col-span-5 min-w-fit border-r will-change-scroll border-l border-[#38444d]/60 sticky top-0 h-screen min-h-full scroll-smooth scrollbar-hide overflow-y-auto`,
	headWrapper: `sticky right-0 left-0 bg-black/70 m-0  backdrop-contrast-75 backdrop-brightness-75   border-b border-[#38444d]/60  top-0 backdrop-blur z-10`,
	icon: `font-bold text-[1.2rem] rounded-full w-9 h-9 hover:bg-[#191919] flex justify-center items-center`,
};

const ProfilePage = ({ user }) => {
	const router = useRouter();

	const [tweetPost, setTweetPost] = useState([]);
	const [postOwners, setPostOwners] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getPost = async () => {
			setLoading(true);
			await onSnapshot(collection(dataBase, "posts"), async (snapshot) =>
				setTweetPost(await snapshot.docs.map((doc) => doc.data()))
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
					<span className="text-xl font-semibold">
						{user.firstName} {user.lastName}
					</span>
					<span className="text-sm">{user.tweets.length} Tweets</span>
				</div>
			</div>
			{/* Cover Section */}
			<Cover user={user} />
			{!loading ? (
				tweetPost.map((tweet, index) => {
					const postOwner = postOwners.find((owner) => owner.email === tweet.postOwner);
					if (tweet && postOwner);
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
							likes={tweet.likes}
							tweetId={tweet.tweetId}
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
		</div>
	);
};

export default ProfilePage;
