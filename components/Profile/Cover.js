import React, { useState } from "react";
import { BiCalendarEvent } from "react-icons/bi";

const style = {
	activeTabLink: `font-bold text-[0.95rem] flex justify-center items-center text-medium w-full relative before:absolute before:top-[1.8rem] before:left-[25%] before:content-[''] before:w-[50%] before:h-[2px] before:bg-[#1d9bf0]`,
	tabLink: `font-light text-medium`,
};

const Cover = ({ user }) => {
	const [active, setActive] = useState("tweets");
	return (
		<div>
			<div
				style={{ backgroundImage: `url(${!user.coverImage ? "" : user.coverImage})` }}
				className="w-full object-cover bg-cover bg-no-repeat flex relative bg-slate-800 h-48"
			>
				<img
					src={user.avatar}
					alt=""
					className="w-36 h-36 border-4 border-black ring-1 rounded-full absolute top-[50%] left-3"
				/>
				<span className="right-4 border rounded-3xl py-1 px-3 border-[#38444d]/60 hover:bg-[#191919]/60 transition-all  bottom-[-3rem] absolute">
					Edit Profile
				</span>
			</div>
			<div className="w-full mt-10 p-7 text-lg font-semibold">
				<h2>
					{user.firstName} {user.lastName}
				</h2>
				<p className="text-sm text-slate-400 font-normal">{user.customId}</p>
				<p className="text-[0.9rem] mt-5 flex gap-1 items-center text-slate-400 font-normal">
					<BiCalendarEvent /> Joined{" "}
					{new Date(user.timestamp.seconds * 1000).toLocaleDateString(undefined, {
						year: "numeric",
						month: "long",
					})}
				</p>
				<p className="text-[0.9rem] mt-[-0.4rem] flex gap-1 items-center text-slate-400 font-normal">
					<span>{user.followers.length} Followers</span>
					<span>{user.followings.length} Followings</span>
				</p>
			</div>
			<div className="flex w-full gap-1 border-b-2 border-[#38444d]/60">
				<div
					onClick={(e) => {
						setActive(e.currentTarget.childNodes[0].textContent.toLowerCase());
					}}
					className="w-full flex justify-center  transition-all   items-center h-[3rem] cursor-pointer hover:bg-[#191919]"
				>
					<span className={active === "tweets" ? style.activeTabLink : style.tabLink}>
						Tweets
					</span>
				</div>
				<div
					onClick={(e) => {
						setActive(e.currentTarget.childNodes[0].textContent.toLowerCase());
					}}
					className="w-full flex justify-center transition-all   items-center h-[3rem] cursor-pointer hover:bg-[#191919]"
				>
					<span
						className={active === "tweets & replies" ? style.activeTabLink : style.tabLink}
					>
						Tweets & Replies
					</span>
				</div>
				<div
					onClick={(e) => {
						setActive(e.currentTarget.childNodes[0].textContent.toLowerCase());
					}}
					className="w-full flex justify-center transition-all   items-center h-[3rem] cursor-pointer hover:bg-[#191919]"
				>
					<span className={active === "media" ? style.activeTabLink : style.tabLink}>
						Media
					</span>
				</div>
				<div
					onClick={(e) => {
						setActive(e.currentTarget.childNodes[0].textContent.toLowerCase());
					}}
					className="w-full flex justify-center transition-all   items-center h-[3rem] cursor-pointer hover:bg-[#191919]"
				>
					<span className={active === "likes" ? style.activeTabLink : style.tabLink}>
						Likes
					</span>
				</div>
			</div>
		</div>
	);
};

export default Cover;
