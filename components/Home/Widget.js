import React from "react";
import { BiSearch } from "react-icons/bi";
import { news, whoToFollow } from "@/data/staticData";
import Image from "next/image";

const styles = {
	wrapper: `p-4 mr-5 h-fit col-span-4 hidden lg:inline`,
	SearchBarContainer: `bg-[#000000] w-full z-10 flex justify-center items-center sticky top-0 py-3`,
	searchBar: `flex items-center w-full bg-[#243340] p-2 rounded-3xl `,
	searchIcon: `text-[#8899a6] mr-2`,
	inputBox: `bg-transparent outline-none`,
	section: `bg-[#0f161e] my-6 rounded-xl overflow-hidden`,
	title: `p-2 px-4 font-bold text-lg`,
	showMore: `p-2 text-[#1d9bf0] text-sm cursor-pointer hover:bg-[#22303c]`,
	item: `flex items-center p-3 my-2 hover:bg-[#22303c] cursor-pointer gap-2`,
	newsItemLeft: `flex-1`,
	newsItemCategory: `text-[#8899a6] text-xs font-semibold`,
	newsItemTitle: `text-sm font-bold`,
	newsItemRight: `w-1/5 ml-3`,
	newsItemImage: `rounded-xl h-14 w-14 overflow-hidden relative -z-0`,
	followAvatarContainer: `w-1/6`,
	followAvatar: `rounded-full h-[60px] w-[60px] relative z-0 overflow-hidden`,
	profileDetails: `flex-1`,
	name: `font-bold`,
	handle: `text-[#8899a6]`,
	followButton: `bg-white text-black w-fit mt-1 hover:bg-pink-500 px-3 py-1 rounded-full text-xs font-bold`,
};

const Widget = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.SearchBarContainer}>
				<div className={styles.searchBar}>
					<BiSearch className={styles.searchIcon} />
					<input placeholder={"Search Twitter"} className={styles.inputBox} type="text" />
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.title}>What`s Happening?</div>
				{news.map((news, index) => (
					<div key={index} className={styles.item}>
						<div className={styles.newsItemLeft}>
							<div className={styles.newsItemCategory}>{news.category}</div>
							<div className={styles.newsItemTitle}>{news.title}</div>
						</div>
						<div className={styles.newsItemRight}>
							<div className={styles.newsItemImage}>
								{news.image && (
									<Image
										sizes="100vw"
										width={0}
										height={0}
										style={{ width: "100%", height: "auto" }}
										src={news.image}
										alt={news.category}
									/>
								)}
							</div>
						</div>
					</div>
				))}
				<div className={styles.showMore}>Show More</div>
			</div>
			<div className={styles.section}>
				<div className={styles.title}>Who to Follow</div>
				{whoToFollow.map((item, index) => (
					<div key={index} className={styles.item}>
						<div className={styles.followAvatarContainer}>
							<div className={styles.followAvatar}>
								{item.avatar && (
									<Image
										sizes="100vw"
										width={0}
										height={0}
										style={{ width: "100%", height: "auto" }}
										src={item.avatar}
										alt={item.name}
									/>
								)}
							</div>
						</div>
						<div>
							<div className={styles.name}>{item.name}</div>
							<div className={styles.handle}>{item.handle}</div>
							<a
								href={item.follow}
								rel="noreferrer"
								target={"_blank"}
								className={styles.followButton}
							>
								Follow
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Widget;
