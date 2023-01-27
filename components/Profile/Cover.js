import React, { useState } from "react";

const style = {
	activeTabLink: `font-bold text-[0.95rem] flex justify-center items-center text-medium w-full relative before:absolute before:top-[1.8rem] before:left-[25%] before:content-[''] before:w-[50%] before:h-[2px] before:bg-[#1d9bf0]`,
	tabLink: `font-light text-medium`,
};

const Cover = () => {
	const [active, setActive] = useState("tweets");
	console.log(active);
	return (
		<div>
			<div className="w-full bg-[url(https://th.bing.com/th/id/OIP.pvKBE8bBVqrIrYQbIYsHNgHaEK?pid=ImgDet&rs=1)] object-cover flex relative bg-slate-800 h-48">
				<img
					src="https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png"
					alt=""
					className="w-36 h-36 border-4 border-black ring-1 rounded-full absolute top-[50%] left-3"
				/>
			</div>
			<div className="w-full mt-14 p-7 text-lg font-semibold">
				<h2>Rohit Tiwari</h2>
				<p className="text-sm text-slate-400 font-normal">@rohittiwari</p>
			</div>
			<div className="flex w-full gap-1 border-b-2 border-[#38444d]/60">
				<div
					onClick={(e) => {
						setActive(e.currentTarget.childNodes[0].textContent.toLowerCase());
					}}
					className="w-full flex justify-center items-center h-[3rem] cursor-pointer hover:bg-[#191919]"
				>
					<span className={active === "tweets" ? style.activeTabLink : style.tabLink}>
						Tweets
					</span>
				</div>
				<div
					onClick={(e) => {
						setActive(e.currentTarget.childNodes[0].textContent.toLowerCase());
					}}
					className="w-full flex justify-center items-center h-[3rem] cursor-pointer hover:bg-[#191919]"
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
					className="w-full flex justify-center items-center h-[3rem] cursor-pointer hover:bg-[#191919]"
				>
					<span className={active === "media" ? style.activeTabLink : style.tabLink}>
						Media
					</span>
				</div>
				<div
					onClick={(e) => {
						setActive(e.currentTarget.childNodes[0].textContent.toLowerCase());
					}}
					className="w-full flex justify-center items-center h-[3rem] cursor-pointer hover:bg-[#191919]"
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
