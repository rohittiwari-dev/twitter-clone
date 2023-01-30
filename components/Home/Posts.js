import React, { useEffect, useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { format } from "timeago.js";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { useSession } from "next-auth/react";
import dataBase from "@/utils/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const styles = {
	wrapper: `flex p-3 border-b border-[#38444d]/60`,
	profileImage: `rounded-full h-[40px] w-[40px] object-cover`,
	postMain: `flex-1 px-4`,
	headerDetails: `flex items-center`,
	name: `font-bold mr-1`,
	verified: `text-[0.8rem]`,
	handleAndTimeAgo: `text-[#8899a6] ml-1`,
	tweet: `my-2`,
	tweetmedia: "w-[650] select-none pointer-events-none h-[420] rounded-2xl cover object-fit image",
	image: `rounded-3xl`,
	footer: `flex justify-between  mt-2 text-[#8899a6]`,
	footerIcon: `rounded-full p-[0.3rem] text-[1rem] flex  relative items-center gap-0`,
};

const Posts = ({
	displayName,
	text,
	timestamp,
	username,
	isProfileImageNFT,
	avatar,
	tweetmedia,
	isVerified,
	commentsCount,
	likesCount,
}) => {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const getComments = async () => {
			await onSnapshot(collection(dataBase, "comments"), (snapshot) =>
				setComments(snapshot.docs.map((doc) => doc.data()))
			);
		};
		getComments();
	}, [dataBase]);

	return (
		<div className={styles.wrapper}>
			<div>
				<img
					src={avatar}
					alt={username}
					className={
						isProfileImageNFT ? `${styles.profileImage} smallHex` : styles.profileImage
					}
				/>
			</div>

			<div className={styles.postMain}>
				<div>
					<span className={styles.headerDetails}>
						<span className={styles.name}>{displayName}</span>
						{isProfileImageNFT && (
							<span className={styles.verified}>
								<BsFillPatchCheckFill color="#Ffd700" />
							</span>
						)}
						{isVerified && (
							<span className={styles.verified}>
								<BsFillPatchCheckFill color="#1DA1F2" />
							</span>
						)}
						<span className={styles.handleAndTimeAgo}>
							{username} ● {format(new Date(timestamp.seconds * 1000).getTime())}
						</span>
					</span>
					<div className={styles.tweet}>{text}</div>
					{tweetmedia && <img src={tweetmedia} alt="" className={`${styles.tweetmedia}`} />}
				</div>
				<div className={styles.footer}>
					<span className={`${styles.footerIcon} hover:bg-[#1e364a] hover:text-[#1d9bf0]`}>
						<FaRegComment />{" "}
						<span className="text-xs absolute top-0 left-5 font-semibold">
							{commentsCount > 0 && commentsCount}
						</span>
					</span>
					<span className={`${styles.footerIcon} hover:text-[#03ba7c] hover:bg-[#1b393b]`}>
						<FaRetweet />
					</span>
					<span className={`${styles.footerIcon} hover:text-[#f91c80] hover:bg-[#39243c]`}>
						<AiOutlineHeart />
						<span className="text-xs absolute top-0 left-5 font-semibold">
							{likesCount > 0 && likesCount}
						</span>
					</span>
					<span className={`${styles.footerIcon} hover:text-[#1d9bf0] hover:bg-[#1e364a]`}>
						<TbBrandGoogleAnalytics />
					</span>
					<span className={`${styles.footerIcon} hover:text-[#1d9bf0] hover:bg-[#1e364a]`}>
						<FiShare />
					</span>
				</div>
			</div>
		</div>
	);
};

export default Posts;
