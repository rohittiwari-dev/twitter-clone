import React, {useEffect, useState} from "react";
import {BsStars} from "react-icons/bs";
import TweetBox from "@/components/Home/TweetBox";
import Posts from "@/components/Home/Posts";
import dataBase from "@/firebase";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {ImSpinner9} from "react-icons/im";
import Sidebar from "../sidebar/Sidebar";
import Image from "next/image";

const styles = {
    profileImage: `h-8 w-8 rounded-full overflow-hidden relative`,
    wrapper: `col-span-9 sm:col-span-7 lg:col-span-5  border-r will-change-scroll border-l border-[#38444d]/60 sticky top-0 h-screen min-h-full scroll-smooth scrollbar-hide overflow-y-auto relative`,
    headWrapper: `sticky right-0 left-0 bg-black/70 m-0 backdrop-contrast-75 backdrop-brightness-75 border-b border-[#38444d]/60  top-0 backdrop-blur z-10`,
    header: ` flex justify-between items-center p-3 pl-4`,
    headerTab: `flex justify-center items-center `,
    headerButton: `font-light text-ls`,
    headerButtonActive: `font-bold text-[0.95rem] flex justify-center items-center  w-full relative before:absolute before:top-[1.8rem] before:left-[25%] before:content-[''] before:w-[50%] before:h-[2px] before:bg-[#1d9bf0]`,
    headerTitle: `text-xl font-bold`,
};

const Feed = ({user}) => {
    const [feedtype, setFeedtype] = useState("foryou");
    const [tweetPost, setTweetPost] = useState([]);
    const [sidebar, setSideBar] = useState(false);
    const [postOwners, setPostOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        window.addEventListener("resize", () => {
            setSideBar(false)
        });
    }, []);

    useEffect(() => {
        const getPost = async () => {
            setLoading(true);
            await onSnapshot(
                query(collection(dataBase, "posts"), orderBy("timestamp", "desc")),
                async (snapshot) => setTweetPost(await snapshot.docs.map((doc) => doc.data()))
            );
            await onSnapshot(collection(dataBase, "users"), async (snapshot) =>
                setPostOwners(await snapshot.docs.map((doc) => doc.data()))
            );
            setLoading(false);
        };
        getPost();
    }, []);

    return (
        <div
            className={!sidebar ? styles.wrapper : `${styles.wrapper} overflow-y-hidden`}
        >
            <div
                className={`fixed top-0 left-0 bg-black shadow-lg  shadow-slate-900 z-50 transition ease-in-out duration-700 ${
                    sidebar ? "max-w-fit" : "w-0 overflow-hidden"
                }`}
            >
                <Sidebar setSidebar={setSideBar} user={user} mobile={true} activeLink={"Home"}/>
            </div>
            <div className={styles.headWrapper} onClick={
                sidebar
                    ? () => {
                        document.getElementById("stopScroll").style.overflowY = "auto";
                        setSideBar(false);
                    }
                    : null
            }>
                <div className={styles.header}>
                    <div
                        onClick={() => {
                            document.getElementById("stopScroll").style.overflowY = "hidden";
                            setSideBar(true);
                        }}
                        className={
                            user.nftVerified
                                ? `${styles.profileImage} smallHex hover:border sm:hidden hover:border-slate-500/50`
                                : `${styles.profileImage} hover:border-2  sm:hidden hover:border-cyan-500/50`
                        }
                    >
                        {user.avatar && (
                            <Image
                                fill
                                sizes="full"
                                src={`${!user.avatar ? "" : user.avatar}`}
                                alt={"User Profile Image"}
                            />
                        )}
                    </div>
                    <div className={styles.headerTitle}>
                        <div className="hidden sm:inline">Home</div>
                        <div className="w-6 h-6 relative sm:hidden ">
                            <Image
                                src={
                                    "https://th.bing.com/th/id/R.3f7189662f19f8318fc75252deee723a?rik=Qa956Np1tp8Zcg&riu=http%3a%2f%2f1000logos.net%2fwp-content%2fuploads%2f2017%2f06%2fTwitter-Logo.png&ehk=6ekNd2ZmhpvFDGRZF19QcumP9fb8pZRkwrbFbK%2bpULA%3d&risl=&pid=ImgRaw&r=0"
                                }
                                fill
                                sizes="full"
                                alt="twitter"
                            />
                        </div>
                    </div>
                    <BsStars/>
                </div>
                <div className={styles.headerTab}>
                    <div
                        onClick={(e) => {
                            e.currentTarget.childNodes[0].className = styles.headerButtonActive;
                            setFeedtype("foryou");
                            document.getElementById("againstyou").className = styles.headerButton;
                        }}
                        className="w-full flex justify-center items-center  transition-all   h-[3rem] cursor-pointer hover:bg-[#191919]"
                    >
						<span id={"foryou"} className={styles.headerButtonActive}>
							For You
						</span>
                    </div>
                    <div
                        onClick={(e) => {
                            e.currentTarget.childNodes[0].className = styles.headerButtonActive;
                            setFeedtype("againstyou");
                            document.getElementById("foryou").className = styles.headerButton;
                        }}
                        className="w-full flex justify-center  transition-all   items-center h-[3rem] cursor-pointer hover:bg-[#191919]"
                    >
						<span id={"againstyou"} className={styles.headerButton}>
							Following You
						</span>
                    </div>
                </div>
            </div>

            <TweetBox user={user}/>
            {!loading ? (
                tweetPost.map((tweet, index) => {
                    const postOwner = postOwners.find((owner) => owner.email === tweet.postOwner);
                    if (tweet && postOwner)
                        return (
                            <Posts
                                key={index}
                                tweetId={tweet.tweetId}
                                displayName={postOwner?.firstName}
                                username={postOwner?.customId}
                                text={tweet?.tweetMessage}
                                userId={postOwner?.customId}
                                avatar={postOwner?.avatar}
                                timestamp={tweet?.timestamp}
                                tweetmedia={tweet?.tweetImage}
                                likes={tweet.likes}
                                likesCount={tweet?.likesCount}
                                commentsCount={tweet?.commentsCount}
                                isProfileImageNFT={postOwner?.nftVerified}
                                isVerified={postOwner?.verifiedNormal}
                            />
                        );
                })
            ) : (
                <ImSpinner9
                    color={"#1DA1F2"}
                    size="30"
                    className="text-center w-full mt-20 animate-spin"
                />
            )}

            <div className={"flex flex-col justify-center items-center"}></div>
        </div>
    );
};

export default Feed;
