import dataBase, {storage} from "@/firebase";
import {fetchUsers} from "@/redux/reduxActions";
import {doc, updateDoc} from "firebase/firestore";
import {deleteObject, getDownloadURL, getMetadata, ref, uploadBytes,} from "firebase/storage";
import Image from "next/image";
import React, {useState} from "react";
import {BiCalendarEvent, BiCamera} from "react-icons/bi";
import {BsFillPatchCheckFill} from "react-icons/bs";
import {useDispatch} from "react-redux";
import {v4} from "uuid";
import {CgSpinnerTwoAlt} from "react-icons/cg";

const style = {
    activeTabLink: `font-bold text-[0.95rem] px-4 flex justify-center items-center text-medium w-full  min-w-max relative before:absolute before:top-[1.8rem] before:left-[25%] before:content-[''] before:w-[50%] before:h-[2px] before:bg-[#1d9bf0]`,
    tabLink: `font-light  min-w-max px-4 text-medium`,
};

const Cover = ({user, followLoading, userType, follow, currentUser}) => {
    const [active, setActive] = useState("tweets");
    const dispatch = useDispatch();
    const updateImage = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            if (e.target.name === "coverImage" && user.coverImage) {
                const oldimgRef = await getMetadata(ref(storage, user.coverImage));
                if (oldimgRef) await deleteObject(ref(storage, oldimgRef.fullPath));
            } else if (
                e.target.name === "profileImage" &&
                user?.avatar?.indexOf("lh3.googleusercontent.com") === -1 &&
                user.avatar
            ) {
                const oldimgRef = await getMetadata(ref(storage, user.avatar));
                if (oldimgRef) await deleteObject(ref(storage, oldimgRef.fullPath));
            }
            const newImageRef = ref(
                storage,
                e.target.name === "coverImage" ? "coverImage/" + v4() : "profileImage/" + v4()
            );
            const image = await uploadBytes(newImageRef, file);
            if (image) {
                const ImageUrl = await getDownloadURL(newImageRef);
                if (ImageUrl)
                    if (e.target.name === "coverImage")
                        await updateDoc(doc(dataBase, "users", user.email), {
                            coverImage: ImageUrl,
                        });
                    else
                        await updateDoc(doc(dataBase, "users", user.email), {
                            avatar: ImageUrl,
                        });
            }
        }
        await dispatch(fetchUsers(currentUser.email));
        document.activeElement.blur();
    };
    return (
        <div>
            <div
                style={{backgroundImage: `url(${!user.coverImage ? "" : user.coverImage})`}}
                className="w-full  min-w-max  object-cover select-none bg-cover bg-no-repeat flex relative bg-slate-800 h-48"
            >
                {userType && (
                    <div
                        className="w-9 h-9  select-none shadow-lg bottom-2 bg-black/30  transition-all duration-200 hover:bg-black/70 flex items-center justify-center right-2 rounded-full absolute overflow-hidden">
                        <label htmlFor="cover_img">
                            <div className=" w-full h-full">
                                <BiCamera size={25}/>
                            </div>
                            <input
                                type={"file"}
                                onChange={updateImage}
                                accept="image/*"
                                name="coverImage"
                                id="cover_img"
                                hidden
                            />
                        </label>
                    </div>
                )}
                <div
                    className={
                        user.nftVerified
                            ? "w-36 h-36 select-none  rounded-full absolute top-[50%] overflow-hidden left-3 smallHex"
                            : "w-36 h-36 select-none  rounded-full  absolute top-[50%] overflow-hidden left-3"
                    }
                >
                    <label htmlFor="prof_img">
                        <div className="relative w-36 h-36 bg-slate-800 hover:border-2 hover:border-slate-500/30">
                            {user.avatar && (
                                <Image sizes="full" fill priority src={user.avatar} alt="Profile Image"/>
                            )}
                        </div>
                        {userType && (
                            <input
                                type={"file"}
                                onChange={updateImage}
                                accept="image/*"
                                name="profileImage"
                                id="prof_img"
                                hidden
                            />
                        )}
                    </label>
                </div>
                {userType && (
                    <span
                        className="right-4 border rounded-3xl py-1 px-3 border-[#38444d]/60 hover:bg-[#191919]/60 transition-all  bottom-[-3rem] absolute">
						Edit Profile
					</span>
                )}
            </div>
            <div className={"flex justify-between items-center"}>
                <div className="w-full mt-10 p-7 text-lg font-semibold">
                    <h2 className="flex gap-1 items-center">
                        {user.nftVerified && <BsFillPatchCheckFill color="#Ffd700"/>}
                        {user.verifiedNormal && <BsFillPatchCheckFill color="#1DA1F2"/>}
                        {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-sm text-slate-400 font-normal">{user.customId}</p>
                    <p className="text-[0.9rem] mt-5 flex gap-1 items-center text-slate-400 font-normal">
                        <BiCalendarEvent/> Joined{" "}
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
                {!userType &&
                    (
                        !currentUser.followings.includes(user.email) ?
                            <div onClick={follow}
                                 className={followLoading ? "mr-10 select-none pointer-events-none cursor-pointer border rounded-3xl py-1 px-3 border-blue-400/60 bg-gray-900/60 transition-all" : "mr-10 select-none cursor-pointer border rounded-3xl py-1 px-3 border-blue-400/60 hover:bg-blue-500 bg-blue-400/60 transition-all"}> {!followLoading ? "Follow" :
                                <CgSpinnerTwoAlt size={15} color={"#ffffff"} className={"animate-spin"}/>}
                            </div> :
                            <div onClick={follow}
                                 className={followLoading ? "mr-10 select-none pointer-events-none cursor-pointer border rounded-3xl py-1 px-3 border-blue-400/60 bg-gray-900/60 transition-all" : "mr-10 select-none cursor-pointer border rounded-3xl py-1 px-3 border-blue-400/60 bg-blue-500 hover:bg-blue-400/60 transition-all"}>{!followLoading ? "Followed" :
                                <CgSpinnerTwoAlt size={15} color={"#ffffff"} className={"animate-spin"}/>}
                            </div>
                    )
                }
            </div>
            <div className="flex w-full  min-w-max  gap-1 border-b-2 border-[#38444d]/60">
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
