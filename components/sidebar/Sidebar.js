import React, {useState} from "react";
import {VscTwitter} from "react-icons/vsc";
import {FiBell, FiMoreHorizontal} from "react-icons/fi";
import SidebarOption from "@/components/sidebar/SidebarOption";
import {RiFileList2Fill, RiHome7Fill, RiHome7Line} from "react-icons/ri";
import {BiHash} from "react-icons/bi";
import {FaBell, FaHashtag, FaRegListAlt} from "react-icons/fa";
import {HiMail, HiOutlineMail} from "react-icons/hi";
import {BsBookmark, BsBookmarkFill, BsFillPatchCheckFill, BsPerson, BsPersonFill,} from "react-icons/bs";
import {CgMoreO} from "react-icons/cg";
import TbSend from "@/assets/Twitter-Send-Svg.png";
import Image from "next/image";
import {signOut} from "next-auth/react";
import {useRouter} from "next/router";
import {AiTwotoneSetting} from "react-icons/ai";
import {IoLogOut} from "react-icons/io5";

const styles = {
    wrapper: `items-end lg:items-start flex-col h-screen col-span-2 ml-2 sm:flex transition-all`,
    twitterIconContainer: `text-3xl mr-7 lg:mx-4 my-3`,
    tweetButton: `text-[1.1rem] w-fit bg-[#1d9bf0] hover:bg-[#1b8cd8] flex items-center justify-center font-bold rounded-full lg:rounded-3xl p-3 lg:min-w-full mt-[10px] cursor-pointer`,
    navContainer: `flex-1 flex flex-col items-center lg:block pr-5 lg:pr-0`,
    profileButton: `flex bg-black/60 z-[1] transition-all sm:mb-6 w-fit mr-5 lg:mr-0 gap-3 p-2 items-center cursor-pointer hover:bg-[#191919] rounded-full`,
    profileLeft: `flex items-center justify-center`,
    profileImage: `h-10 w-10 rounded-full relative overflow-hidden `,
    profileRight: `flex-1 flex justify-between hidden gap-5 lg:flex`,
    details: `flex-1`,
    name: `text-sm font-semibold pb-0 flex gap-1 items-center`,
    handle: `text-sm pt-0 text-[#8899a6]`,
    moreContainer: `flex items-center mr-2 hidden lg:flex`,
};

const Sidebar = ({activeLink, user, mobile, setSidebar}) => {
    const [selected, setSelected] = useState(activeLink);
    const [profileDrop, setProfileDrop] = useState(false);
    const router = useRouter();
    return (
        <div className={!mobile ? `${styles.wrapper} hidden` : `${styles.wrapper}  flex px-5`}>
            <div className={styles.twitterIconContainer}>
                <VscTwitter/>
            </div>
            <div className={styles.navContainer} onClick={() => {
                setProfileDrop(false)
            }}>
                <SidebarOption
                    text={"Home"}
                    urlExists={true}
                    mobile={mobile}
                    setSidebar={() => setSidebar(false)}
                    Icon={selected === "Home" ? RiHome7Fill : RiHome7Line}
                    isActive={Boolean(selected === "Home")}
                    setSelected={setSelected}
                    redirect={"/"}
                />
                <SidebarOption
                    text={"Explore"}
                    urlExists={true}
                    Icon={selected === "Explore" ? FaHashtag : BiHash}
                    isActive={Boolean(selected === "Explore")}
                    setSelected={setSelected}
                    redirect={"/explore"}
                />
                <SidebarOption
                    text={"Notifications"}
                    urlExists={true}
                    Icon={selected === "Notifications" ? FaBell : FiBell}
                    isActive={Boolean(selected === "Notifications")}
                    setSelected={setSelected}
                    redirect={"/notifications"}
                />
                <SidebarOption
                    text={"Messages"}
                    urlExists={true}
                    Icon={selected === "Messages" ? HiMail : HiOutlineMail}
                    isActive={Boolean(selected === "Messages")}
                    setSelected={setSelected}
                    redirect={"/messages"}
                />
                <SidebarOption
                    text={"Bookmarks"}
                    urlExists={true}
                    Icon={selected === "Bookmarks" ? BsBookmarkFill : BsBookmark}
                    isActive={Boolean(selected === "Bookmarks")}
                    setSelected={setSelected}
                    redirect={"/bookmarks"}
                />
                <SidebarOption
                    text={"Lists"}
                    urlExists={true}
                    Icon={selected === "Lists" ? RiFileList2Fill : FaRegListAlt}
                    isActive={Boolean(selected === "Lists")}
                    setSelected={setSelected}
                    redirect={"/lists"}
                />
                <SidebarOption
                    text={"Profile"}
                    urlExists={true}
                    Icon={selected === "Profile" ? BsPersonFill : BsPerson}
                    isActive={Boolean(selected === "Profile")}
                    setSelected={setSelected}
                    redirect={"/" + user?.customId?.replace("@", "")}
                />
                <SidebarOption urlExists={false} text={"More"} Icon={CgMoreO} setSelected={setSelected}/>

                <div
                    className={styles.tweetButton}
                    onClick={() => {
                        router.push("/");
                    }}
                >
					<span className="inline lg:hidden w-8 overflow-hidden h-8 relative">
						<Image src={TbSend} fill sizes="full" alt="twitter"/>
					</span>
                    <span className="hidden lg:inline">Tweet</span>
                </div>
            </div>
            <div className={" flex flex-col justify-center items-center sticky bottom-5 top-92 "}>
                {profileDrop ? <div
                    className={"absolute z-0 text-base flex flex-col mr-2 justify-center items-center rounded-full w-fit p-1  bottom-full mb-1  bg-neutral-950 shadow-xl shadow-neutral-800 lg:rounded "}>
                    <div onClick={async () => {
                        setProfileDrop(false);
                        mobile && setSidebar(false);
                        await signOut();
                    }}>
                        <SidebarOption
                            text={"Logout"}
                            Icon={IoLogOut}
                            urlExists={false}
                            setSelected={setSelected}
                        />
                    </div>
                    <div onClick={() => {
                        setProfileDrop(false)
                        mobile && setSidebar(false);
                    }}>
                        <SidebarOption
                            text={"Settings"}
                            Icon={AiTwotoneSetting}
                            urlExists={false}
                            setSelected={setSelected}
                        />
                    </div>

                </div> : null}
                <div
                    className={styles.profileButton}
                    onClick={() => {
                        setProfileDrop(!profileDrop)
                    }}
                >
                    <div className={styles.profileLeft}>
                        <div
                            className={
                                user.nftVerified ? styles.profileImage + "smallHex" : styles.profileImage
                            }
                        >
                            {user.avatar && (
                                <Image
                                    fill
                                    sizes="full"
                                    src={`${!user.avatar ? "" : user.avatar}`}
                                    alt={"Profile Image"}
                                />
                            )}
                        </div>
                    </div>

                    <div className={styles.profileRight}>
                        <div className={styles.details}>
                            <div className={styles.name}>
                                {user.nftVerified && <BsFillPatchCheckFill color="#Ffd700"/>}
                                {user.verifiedNormal && <BsFillPatchCheckFill color="#1DA1F2"/>}
                                {user?.firstName} {user?.lastName}
                            </div>
                            <div className={styles.handle}>{user?.customId}</div>
                        </div>

                        <div className={styles.moreContainer}>
                            <FiMoreHorizontal/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
