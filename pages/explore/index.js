import { useRouter } from "next/router";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

const Explore = () => {
	const router = useRouter();
	return (
		<div>
			<span
				className={
					"font-bold text-[1.2rem] rounded-full w-9 h-9 hover:bg-[#191919] flex justify-center items-center"
				}
				onClick={(e) => {
					e.preventDefault();
					router.back();
				}}
			>
				<IoArrowBack />
			</span>
			Hello I am Explore
		</div>
	);
};

export default Explore;
