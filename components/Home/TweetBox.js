import React from "react";
import { BsEmojiSmile, BsImage } from "react-icons/bs";
import { HiOutlineGif } from "react-icons/hi2";
import { CgOptions } from "react-icons/cg";
import { MdScheduleSend } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";

const styles = {
	wrapper: `flex flex-row border-b pt-4 px-4 h-auto border-[#38444d]`,
	tweetBoxLeft: `mr-4 h-fit`,
	tweetBoxRight: `flex-1 h-max flex flex-col gap-3 justify-center pt-3`,
	profileImage: `h-10 w-10 rounded-full overflow-hidden object-fit`,
	inputField: `w-full outline-none bg-transparent text-lg h-auto resize-y min-h-[3rem] scrollbar-hide`,
	formLowerContainer: `flex w-full py-3`,
	iconsContainer: `text-[#1d9bf0] flex flex-1 items-center `,
	icon: `mr-1 font-bold text-[1.2rem] rounded-full w-9 h-9 hover:bg-[#191919] flex justify-center items-center`,
	submitGeneral: `px-6 py-2 rounded-3xl font-bold`,
	inactiveSubmit: `bg-[#196195] text-[#95999r]  rounded-3xl px-4 py-[0.45rem]`,
	activeSubmit: `bg-[#1d9bf0] text-white rounded-3xl font-bold px-4 py-[0.45rem]`,
};

const TweetBox = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.tweetBoxLeft}>
				<div className={styles.profileImage}>
					<img
						src="https://www.247voipservices.com/wp-content/uploads/2020/12/male-avtar.png"
						alt={""}
					/>
				</div>
			</div>
			<div className={styles.tweetBoxRight}>
				<textarea
					type="text"
					placeholder="What's happening?"
					className={styles.inputField}
				></textarea>
				<div className={styles.formLowerContainer}>
					<div className={styles.iconsContainer}>
						<span className={styles.icon}>
							<BsImage />
						</span>
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
					<button className={styles.inactiveSubmit}>Tweet</button>
				</div>
			</div>
		</div>
	);
};

export default TweetBox;
