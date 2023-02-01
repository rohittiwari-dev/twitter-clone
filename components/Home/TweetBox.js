import React, { useState } from "react";
import { BsEmojiSmile, BsImage } from "react-icons/bs";
import { HiOutlineGif, HiXMark } from "react-icons/hi2";
import { CgOptions, CgSpinnerTwoAlt } from "react-icons/cg";
import { MdScheduleSend } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import dataBase, { storage } from "@/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import { fetchUsers } from "@/redux/reduxActions";
import Image from "next/image";

const styles = {
	wrapper: `flex w-screen sm:w-full flex-row border-b pt-4 px-4 h-auto border-[#38444d]/60`,
	tweetBoxLeft: `mr-4 h-fit`,
	tweetBoxRight: `flex-1 h-max flex flex-col gap-3 justify-center pt-3`,
	profileImage: `h-10 w-10 rounded-full overflow-hidden relative`,
	inputField: `w-full resize-none outline-none bg-transparent text-medium h-auto min-h-[3rem] scrollbar-hide`,
	formLowerContainer: `flex w-full py-3`,
	iconsContainer: `text-[#1d9bf0] flex flex-1 items-center flex-wrap sm:flex-nowrap`,
	icon: `mr-1 font-bold text-[1.2rem] rounded-full w-9 h-9 transition-all hover:bg-[#191919] flex justify-center items-center`,
	submitGeneral: `px-6 py-2 rounded-3xl font-bold`,
	inactiveSubmit: `bg-[#196195] transition-all pointer-event-none disabled text-[#95999r] h-fit sm:h-full rounded-3xl px-4 py-[0.45rem]`,
	activeSubmit: `bg-[#1d9bf0] transition-all pointer-event-auto enabled text-white rounded-3xl h-fit sm:h-full font-bold px-4 py-[0.45rem]`,
};

const TweetBox = ({ user }) => {
	const dispatch = useDispatch();
	const [selectedImage, setSelectedImage] = useState(null);
	const [tweeting, setTweeting] = useState(false);
	const [tweet, setTweet] = useState({
		tweetId: v4(),
		comments: [],
		commentsCount: 0,
		likes: [],
		likesCount: 0,
		postOwner: user.email,
		timestamp: new Date(),
		tweetMessage: "",
	});
	const tweetNow = async () => {
		if (tweeting) return;
		if (tweet.tweetMessage !== "" || selectedImage) {
			setTweeting(true);
			const imageRef = ref(storage, "tweetMedia/image/" + tweet.tweetId);
			if (selectedImage) {
				const Image = await uploadString(imageRef, selectedImage, "data_url");
				await setDoc(doc(dataBase, "posts", tweet.tweetId), tweet);
				if (Image) {
					const ImageUrl = await getDownloadURL(imageRef);
					if (ImageUrl) {
						await updateDoc(doc(dataBase, "posts", tweet.tweetId), {
							tweetImage: ImageUrl,
						});
						await updateDoc(doc(dataBase, "users", user.email), {
							tweets: arrayUnion(tweet.tweetId),
						});
					}
				}
			} else {
				await setDoc(doc(dataBase, "posts", tweet.tweetId), tweet);
				await updateDoc(doc(dataBase, "users", user.email), {
					tweets: arrayUnion(tweet.tweetId),
				});
			}
			setSelectedImage(null);
			await dispatch(fetchUsers(user.email));
			setTweet({ ...tweet, tweetMessage: "" });
			setTweeting(false);
		}
	};
	return (
		<div className={styles.wrapper}>
			<div className={styles.tweetBoxLeft}>
				<div className={styles.profileImage}>
					{user.avatar && (
						<Image
							fill
							sizes="full"
							src={`${!user.avatar ? "" : user.avatar}`}
							alt={"User Profile Image"}
						/>
					)}
				</div>
			</div>
			<div className={styles.tweetBoxRight}>
				<textarea
					type="text"
					placeholder="What's happening?"
					name="message"
					onChange={(e) => {
						setTweet({ ...tweet, tweetMessage: e.target.value, tweetId: v4() });
						e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
					}}
					className={styles.inputField}
					value={tweet.tweetMessage}
					maxLength="200"
				></textarea>
				{selectedImage && (
					<div className="relative w-full h-full mr-4  rounded-2xl overflow-hidden ">
						<Image
							sizes="100vw"
							width={0}
							height={0}
							style={{ width: "100%", height: "auto" }}
							priority
							src={selectedImage}
							alt="Tweeted Image"
						/>
						<span
							onClick={() => {
								setSelectedImage(null);
							}}
							className={
								"absolute w-8 h-8 transition-all hover:bg-[#191919]/60 top-1 left-1 rounded-full"
							}
						>
							<AiOutlineCloseCircle className="text-slate-900 w-8 h-8 hover:text-white/60" />
						</span>
					</div>
				)}
				<div className={styles.formLowerContainer}>
					{!tweeting && (
						<div className={styles.iconsContainer}>
							<label htmlFor="tweetMedia" className={styles.icon}>
								<BsImage />
								<input
									type={"file"}
									onChange={(e) => {
										const reader = new FileReader();
										const file = e.target.files[0];
										if (file) reader.readAsDataURL(file);
										reader.onloadend = (read) => {
											setSelectedImage(read.target.result);
										};
										e.target.type = "text";
										e.target.value = "";
										e.target.type = "file";
									}}
									id="tweetMedia"
									accept="image/*"
									name="media"
									hidden
								/>
							</label>
							<span className={styles.icon}>
								<HiOutlineGif />
							</span>
							<span className={styles.icon}>
								<CgOptions />
							</span>
							<span className={styles.icon}>
								<BsEmojiSmile />
							</span>
							<span className={styles.icon}>
								<MdScheduleSend />
							</span>
							<span className={styles.icon}>
								<SlLocationPin />
							</span>
						</div>
					)}
					<button
						className={
							(tweet.tweetMessage !== "" && !tweeting) ||
							(selectedImage !== null && !tweeting)
								? styles.activeSubmit
								: styles.inactiveSubmit
						}
						onClick={() => tweetNow()}
					>
						{!tweeting ? (
							"Tweet"
						) : (
							<CgSpinnerTwoAlt size={15} color={"#ffffff"} className={"animate-spin"} />
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default TweetBox;
