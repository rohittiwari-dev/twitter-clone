import React, { useState } from "react";
import { BsEmojiSmile, BsImage } from "react-icons/bs";
import { HiOutlineGif } from "react-icons/hi2";
import { CgOptions } from "react-icons/cg";
import { MdScheduleSend } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { useSession } from "next-auth/react";

const styles = {
	wrapper: `flex w-screen sm:w-full flex-row border-b pt-4 px-4 h-auto border-[#38444d]/60`,
	tweetBoxLeft: `mr-4 h-fit`,
	tweetBoxRight: `flex-1 h-max flex flex-col gap-3 justify-center pt-3`,
	profileImage: `h-10 w-10 rounded-full overflow-hidden object-fit`,
	inputField: `w-full outline-none bg-transparent text-medium h-auto resize-y min-h-[3rem] scrollbar-hide`,
	formLowerContainer: `flex w-full py-3`,
	iconsContainer: `text-[#1d9bf0] flex flex-1 items-center flex-wrap sm:flex-nowrap`,
	icon: `mr-1 font-bold text-[1.2rem] rounded-full w-9 h-9 hover:bg-[#191919] flex justify-center items-center`,
	submitGeneral: `px-6 py-2 rounded-3xl font-bold`,
	inactiveSubmit: `bg-[#196195] text-[#95999r] h-fit sm:h-full rounded-3xl px-4 py-[0.45rem]`,
	activeSubmit: `bg-[#1d9bf0] text-white rounded-3xl h-fit sm:h-full font-bold px-4 py-[0.45rem]`,
};

const TweetBox = () => {
	const data = useSession();
	const [tweet, setTweet] = useState({
		message: "",
		media: "",
	});
	return (
		<div className={styles.wrapper}>
			<div className={styles.tweetBoxLeft}>
				<div className={styles.profileImage}>
					<img src={data?.data?.user?.image} alt={data?.data?.user?.name} />
				</div>
			</div>
			<div className={styles.tweetBoxRight}>
				<textarea
					type="text"
					placeholder="What's happening?"
					name="message"
					onChange={(e) => {
						setTweet({ ...tweet, message: e.target.value });
						e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
					}}
					className={styles.inputField}
					value={tweet.message}
					maxLength="200"
				></textarea>
				{tweet.media !== "" && (
					<img
						className="w-[600] h-[370] mr-4 pointer-events-none select-none rounded-2xl cover object-fit image"
						src={tweet.media}
						alt=""
					/>
				)}
				<div className={styles.formLowerContainer}>
					<div className={styles.iconsContainer}>
						<label htmlFor="tweetMedia" className={styles.icon}>
							<BsImage />
							<input
								type={"file"}
								onChange={(e) => {
									const reader = new FileReader();
									const file = e.target.files[0];
									reader.onloadend = () => {
										setTweet({ ...tweet, media: reader.result });
									};
									if (file) reader.readAsDataURL(file);
									else setTweet({ ...tweet, media: "" });
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
					<button
						className={
							tweet.message !== "" || tweet.media !== ""
								? styles.activeSubmit
								: styles.inactiveSubmit
						}
					>
						Tweet
					</button>
				</div>
			</div>
		</div>
	);
};

export default TweetBox;
