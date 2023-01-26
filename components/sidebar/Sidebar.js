import React, { useState } from "react";
import { VscTwitter } from "react-icons/vsc";
import { FiBell, FiMoreHorizontal } from "react-icons/fi";
import SidebarOption from "@/components/sidebar/SidebarOption";
import { RiFileList2Fill, RiHome7Fill, RiHome7Line } from "react-icons/ri";
import { BiHash } from "react-icons/bi";
import { FaBell, FaHashtag, FaRegListAlt } from "react-icons/fa";
import { HiMail, HiOutlineMail } from "react-icons/hi";
import { BsBookmark, BsBookmarkFill, BsPerson, BsPersonFill } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { TbSend } from "react-icons/tb";

const styles = {
	wrapper: `flex items-end lg:items-start flex-col h-screen col-span-2 ml-2`,
	twitterIconContainer: `text-3xl mr-7 lg:mx-4 my-3`,
	tweetButton: `text-[1.1rem] w-fit bg-[#1d9bf0] hover:bg-[#1b8cd8] flex items-center justify-center font-bold rounded-3xl p-3 lg:min-w-full mt-[10px] cursor-pointer`,
	navContainer: `flex-1`,
	profileButton: `flex w-fit mx-3 gap-3  p-2 items-center mb-3 cursor-pointer hover:bg-[#191919] rounded-full`,
	profileLeft: `flex items-center justify-center`,
	profileImage: `h-10 w-10 rounded-full`,
	profileRight: `flex-1 flex justify-between hidden gap-5 lg:flex`,
	details: `flex-1`,
	name: `text-sm font-semibold pb-0`,
	handle: `text-sm pt-0 text-[#8899a6]`,
	moreContainer: `flex items-center mr-2 hidden lg:flex`,
};

const Sidebar = ({ initialSelectedIcon = "Home" }) => {
	const [selected, setSelected] = useState(initialSelectedIcon);

	return (
		<div className={styles.wrapper}>
			<div className={styles.twitterIconContainer}>
				<VscTwitter />
			</div>
			<div className={styles.navContainer}>
				<SidebarOption
					text={"Home"}
					Icon={selected === "Home" ? RiHome7Fill : RiHome7Line}
					isActive={Boolean(selected === "Home")}
					setSelected={setSelected}
					redirect={"/"}
				/>
				<SidebarOption
					text={"Explore"}
					Icon={selected === "Explore" ? FaHashtag : BiHash}
					isActive={Boolean(selected === "Explore")}
					setSelected={setSelected}
					redirect={"/explore"}
				/>
				<SidebarOption
					text={"Notifications"}
					Icon={selected === "Notifications" ? FaBell : FiBell}
					isActive={Boolean(selected === "Notifications")}
					setSelected={setSelected}
					redirect={"/notifications"}
				/>
				<SidebarOption
					text={"Messages"}
					Icon={selected === "Messages" ? HiMail : HiOutlineMail}
					isActive={Boolean(selected === "Messages")}
					setSelected={setSelected}
					redirect={"/messages"}
				/>
				<SidebarOption
					text={"Bookmarks"}
					Icon={selected === "Bookmarks" ? BsBookmarkFill : BsBookmark}
					isActive={Boolean(selected === "Bookmarks")}
					setSelected={setSelected}
					redirect={"/bookmarks"}
				/>
				<SidebarOption
					text={"Lists"}
					Icon={selected === "Lists" ? RiFileList2Fill : FaRegListAlt}
					isActive={Boolean(selected === "Lists")}
					setSelected={setSelected}
					redirect={"/lists"}
				/>
				<SidebarOption
					text={"Profile"}
					Icon={selected === "Profile" ? BsPersonFill : BsPerson}
					isActive={Boolean(selected === "Profile")}
					setSelected={setSelected}
					redirect={"/profile"}
				/>
				<SidebarOption text={"More"} Icon={CgMoreO} setSelected={setSelected} />

				<div className={styles.tweetButton}>
					<span className="inline lg:hidden">
						<TbSend />
					</span>
					<span className="hidden lg:inline">Tweet</span>
				</div>
			</div>
			<div className={styles.profileButton}>
				<div className={styles.profileLeft}>
					<img
						className={styles.profileImage}
						src="https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png"
						alt={""}
					/>
				</div>
				<div className={styles.profileRight}>
					<div className={styles.details}>
						<div className={styles.name}>Rohit Tiwari</div>
						<div className={styles.handle}>@rohittiwari</div>
					</div>

					<div className={styles.moreContainer}>
						<FiMoreHorizontal />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
