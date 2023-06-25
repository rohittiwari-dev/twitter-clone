import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CgCloseR } from "react-icons/cg";
import { MdClose } from "react-icons/md";

const ShowModal = ({ closeModel, children }) => {
	return ReactDOM.createPortal(
		<>
			<div className="fixed z-50 overflow-hidden bg-slate-600/40 backdrop-blur-sm flex justify-center items-start w-screen h-screen">
				<div className="place-self-center max-w-[550px] h-fit p-2 bg-black shadow-md shadow-black rounded-3xl">
					<div className="" id="modelBar"></div>
					<div
						onClick={closeModel}
						className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#1e364a] hover:text-[#1d9bf0]"
					>
						<MdClose size={25} />
					</div>
					{children}
				</div>
			</div>
		</>,
		document.getElementById("modelRoot")
	);
};

export default ShowModal;
