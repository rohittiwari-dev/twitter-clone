import React, {useState} from "react";
import {BsFillPatchCheckFill} from "react-icons/bs";
import {format} from "timeago.js";
import {FaRegComment, FaRetweet} from "react-icons/fa";
import {AiOutlineHeart} from "react-icons/ai";
import dataBase, {storage} from "@/firebase";
import {arrayRemove, arrayUnion, deleteDoc, doc, getDoc, updateDoc,} from "firebase/firestore";
import {useSelector} from "react-redux";
import {MdDeleteOutline} from "react-icons/md";
import Image from "next/image";
import {BiShareAlt} from "react-icons/bi";
import Modal from "@/components/models/ShowModel";
import TweetBox from "./TweetBox";
import {useRouter} from "next/router";
import {deleteObject, ref} from "firebase/storage";

const styles = {
    wrapper: `flex p-3 border-b w-full border-[#38444d]/60 hover:bg-[#1e364a]/30`,
    profileImage: `rounded-full z-[2]  h-[40px] w-[40px] overflow-hidden relative`,
    postMain: `flex-1 px-4 `,
    headerDetails: `flex items-center text-sm `,
    name: `font-bold mr-1`,
    verified: `text-[0.8rem]`,
    handleAndTimeAgo: `text-[#8899a6] ml-1`,
    tweet: `my-2`,
    tweetmedia: "w-full select-none pointer-events-none h-auto overflow-hidden rounded-2xl relative",
    image: `rounded-3xl`,
    footer: `flex justify-between  mt-2 text-[#8899a6]`,
    footerIcon: `rounded-full p-[0.3rem] text-[1rem] flex cursor-pointer relative items-center gap-0`,
};

const Posts = ({
                   displayName,
                   userId,
                   text,
                   timestamp,
                   tweetId,
                   username,
                   isProfileImageNFT,
                   avatar,
                   tweetmedia,
                   setLoading,
                   isVerified,
                   commentParentTweetId,
                   commentsCount,
                   likes,
                   likesCount,
                   disableComments,
               }) => {
    const router = useRouter();
    const tweetIdQuery = router.query.tweetId;
    const [showModel, setShowModel] = useState(false);
    const user = useSelector((state) => state.logedinUser.data);

    /* Basic Functions */
    const shoModel = () => {
        if (!showModel) setShowModel(true);
    };
    const closeModel = () => {
        if (showModel) setShowModel(false);
    };

    /* Update Likes in Database Functions */
    const updateLike = async (e) => {
        if (user || user.length > 0)
            if (!disableComments)
                if (likes.length > 0 && likes.includes(user.email)) {
                    await updateDoc(doc(dataBase, "posts", tweetId), {
                        likesCount: likesCount > 0 && likesCount - 1,
                        likes: arrayRemove(user.email),
                    });
                } else {
                    await updateDoc(doc(dataBase, "posts", tweetId), {
                        likes: arrayUnion(user.email),
                        likesCount: likesCount + 1,
                    });
                }
            else {
                if (likes.length > 0 && likes.includes(user.email)) {
                    await updateDoc(doc(dataBase, "comments", tweetId), {
                        likesCount: likesCount > 0 && likesCount - 1,
                        likes: arrayRemove(user.email),
                    });
                } else {
                    await updateDoc(doc(dataBase, "comments", tweetId), {
                        likes: arrayUnion(user.email),
                        likesCount: likesCount + 1,
                    });
                }
            }
        document.activeElement.blur();
    };

    // Delete Post Functions
    const deletePost = async () => {
        if (user.tweets.includes(tweetId)) {
            if (typeof setLoading === "function") setLoading(true);
            const mainTweet = await (await getDoc(doc(dataBase, "posts", tweetId))).data();
            if (mainTweet.tweetImage) {
                const imageRef = ref(storage, mainTweet.tweetImage);
                await deleteObject(imageRef)
            }
            if (mainTweet) {
                await mainTweet.comments.forEach((element) => {
                    deleteDoc(doc(dataBase, "comments", element));
                    updateDoc(doc(dataBase, "users", user.email), {
                        tweets: arrayRemove(tweetId),
                        tweetsReplies: arrayRemove(element),
                    });
                });
            }
            await deleteDoc(doc(dataBase, "posts", tweetId));
            document.activeElement.blur();
            if (tweetIdQuery) router.back();
        }
    };
    // Delete Post Functions
    const deleteComment = async (id) => {
        if (user.tweetsReplies.includes(id)) {
            const mainTweet = await (
                await getDoc(doc(dataBase, "posts", commentParentTweetId))
            ).data();
            const imageRef = ref(storage, tweetmedia);
            await deleteObject(imageRef)
            if (mainTweet) {
                await updateDoc(doc(dataBase, "posts", mainTweet.tweetId), {
                    comments: arrayRemove(tweetId),
                    commentsCount: mainTweet.commentsCount - 1,
                });
            }
            await updateDoc(doc(dataBase, "users", user.email), {
                tweetsReplies: arrayRemove(tweetId),
            });

            await deleteDoc(doc(dataBase, "comments", tweetId));
            document.activeElement.blur();
        }
    };
    return (
        <>
            <div className={styles.wrapper}>
                <div
                    onClick={() => router.push(`/${userId.replace("@", "")}`)}
                    className={
                        isProfileImageNFT
                            ? `${styles.profileImage} smallHex hover:border hover:border-slate-500/50`
                            : `${styles.profileImage} hover:border-2 hover:border-cyan-500/50`
                    }
                >
                    {avatar && (
                        <Image
                            sizes="full"
                            fill
                            src={`${!avatar ? "" : avatar}`}
                            alt={"Tweeter Profile Image"}
                        />
                    )}
                </div>

                <div className={styles.postMain}>
                    <div
                        onClick={
                            !disableComments
                                ? () => router.push(`/${userId.replace("@", "")}/status/${tweetId}`)
                                : null
                        }
                    >
						<span
                            className={`${styles.headerDetails} hover:underline decoration-slate-500/60 hover:underline-offset-1 cursor-pointer`}
                        >
							<span className={styles.name}>{displayName}</span>
                            {isProfileImageNFT && (
                                <span className={styles.verified}>
									<BsFillPatchCheckFill color="#Ffd700"/>
								</span>
                            )}
                            {isVerified && (
                                <span className={styles.verified}>
									<BsFillPatchCheckFill color="#1DA1F2"/>
								</span>
                            )}
                            <span className={styles.handleAndTimeAgo}>
								{username} ● {format(new Date(timestamp.seconds * 1000).getTime())}
							</span>
						</span>
                        <div className={styles.tweet}>{text}</div>

                        {tweetmedia && (
                            <div className={`${styles.tweetmedia}`}>
                                <Image
                                    sizes="100vw"
                                    style={{width: "100%", height: "auto"}}
                                    height={0}
                                    width={0}
                                    priority
                                    src={tweetmedia}
                                    alt="Tweet Media"
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.footer + "pointer-events-none"}>
                        {!disableComments && (
                            <div
                                className={`${styles.footerIcon} hover:bg-[#1e364a] hover:text-[#1d9bf0] `}
                                onClick={shoModel}
                            >
                                <FaRegComment/>{" "}
                                <span className="text-xs absolute left-7 font-semibold">
									{commentsCount > 0 && commentsCount}
								</span>
                                {showModel && (
                                    <Modal closeModel={closeModel}>
                                        <div
                                            className={`${styles.wrapper} hover:bg-[#1e364a]/0 border-none relative`}
                                        >
                                            <div
                                                className={
                                                    isProfileImageNFT
                                                        ? `${styles.profileImage} smallHex`
                                                        : styles.profileImage
                                                }
                                            >
                                                {avatar && (
                                                    <Image
                                                        sizes="100vw"
                                                        fill
                                                        src={`${!avatar ? "" : avatar}`}
                                                        alt={"Tweeter Profile Image"}
                                                    />
                                                )}
                                            </div>
                                            <div
                                                className="bg-slate-400/50 w-[1px] h-full absolute top-8 left-8 z-[0]"></div>
                                            <div className={styles.postMain}>
                                                <div>
													<span className={styles.headerDetails}>
														<span className={styles.name}>{displayName}</span>
                                                        {isProfileImageNFT && (
                                                            <span className={styles.verified}>
																<BsFillPatchCheckFill color="#Ffd700"/>
															</span>
                                                        )}
                                                        {isVerified && (
                                                            <span className={styles.verified}>
																<BsFillPatchCheckFill color="#1DA1F2"/>
															</span>
                                                        )}
                                                        <span className={styles.handleAndTimeAgo}>
															{username} ●{" "}
                                                            {format(new Date(timestamp.seconds * 1000).getTime())}
														</span>
													</span>
                                                    <div className={styles.tweet}>{text}</div>

                                                    {tweetmedia && (
                                                        <div
                                                            className={`${styles.tweetmedia} rounded-none select-text pointer-events-auto`}
                                                        >
                                                            <a
                                                                href={tweetmedia}
                                                                target={"_blank"}
                                                                rel="noreferrer"
                                                            >
                                                                {tweetmedia}
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <TweetBox
                                            user={user}
                                            borderOf={true}
                                            tweetId={tweetId}
                                            comments={true}
                                            commentCount={commentsCount}
                                            closeModel={closeModel}
                                        />
                                    </Modal>
                                )}
                            </div>
                        )}
                        {!user.tweets.includes(tweetId) && !disableComments ? (
                            <div
                                className={`${styles.footerIcon} hover:text-[#03ba7c] hover:bg-[#1b393b]`}
                            >
                                <FaRetweet/>
                            </div>
                        ) : null}
                        <div
                            className={`${styles.footerIcon} hover:text-[#f91c80] hover:bg-[#39243c] ${
                                (user && likes.length > 0) || (user.length > 0 && likes.length > 0)
                                    ? likes.includes(user.email) && "text-[#f91c80] bg-[#39243c]"
                                    : ""
                            }`}
                            onClick={updateLike}
                        >
                            <AiOutlineHeart/>
                            <span className="text-xs absolute left-7 font-semibold">
								{likesCount > 0 && likesCount}
							</span>
                        </div>
                        <span className={`${styles.footerIcon} hover:text-[#1d9bf0] hover:bg-[#1e364a]`}>
							<BiShareAlt/>
						</span>
                        {user.tweets.includes(tweetId) ? (
                            <span
                                onClick={deletePost}
                                className={`${styles.footerIcon} hover:text-[#f0361d] hover:bg-[#4a251e]`}
                            >
								<MdDeleteOutline/>
							</span>
                        ) : user.tweetsReplies.includes(tweetId) ? (
                            <span
                                onClick={() => deleteComment(tweetId)}
                                className={`${styles.footerIcon} hover:text-[#f0361d] hover:bg-[#4a251e]`}
                            >
								<MdDeleteOutline/>
							</span>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Posts;
