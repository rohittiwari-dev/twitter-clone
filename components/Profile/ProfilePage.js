import React, {useEffect, useState} from "react";
import {IoArrowBack} from "react-icons/io5";
import Cover from "./Cover";
import {useRouter} from "next/router";
import Posts from "../Home/Posts";
import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
    where
} from "firebase/firestore";
import dataBase from "@/firebase";
import {ImSpinner9} from "react-icons/im";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "@/redux/reduxActions";

const styles = {
    wrapper: `col-span-9  sm:col-span-7 lg:col-span-5 min-w-fit border-r will-change-scroll border-l border-[#38444d]/60 sticky top-0 h-screen min-h-full scroll-smooth scrollbar-hide overflow-y-auto`,
    headWrapper: `sticky right-0 left-0 bg-black/70 m-0 min-w-max  backdrop-contrast-75 backdrop-brightness-75   border-b border-[#38444d]/60  top-0 backdrop-blur z-10`,
    icon: `font-bold text-[1.2rem] rounded-full w-9 h-9 hover:bg-[#191919] flex justify-center items-center`,
};

const ProfilePage = ({getRequestedUser, user, userType}) => {
    const router = useRouter();
    const currentUser = useSelector(state => state.logedinUser.data);
    const [tweetPost, setTweetPost] = useState([]);
    const [postOwners, setPostOwners] = useState([]);
    const [followLoading, setFollowLoading] = useState(false)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [loadPage, setLoadPage] = useState(false);

    /* Update Likes in Database Functions */
    const follow = async (e) => {
        setFollowLoading(true)
        if (currentUser || Object.keys(currentUser).length > 0) {
            if (user.followers.includes(currentUser.email) && currentUser.followings.includes(user.email)) {
                await updateDoc(doc(dataBase, "users", user.email), {
                    followers: arrayRemove(currentUser.email),
                });
                await updateDoc(doc(dataBase, "users", currentUser.email), {
                    followings: arrayRemove(user.email),
                });
            } else {
                await updateDoc(doc(dataBase, "users", user.email), {
                    followers: arrayUnion(currentUser.email),
                });
                await updateDoc(doc(dataBase, "users", currentUser.email), {
                    followings: arrayUnion(user.email),
                });
            }
        }
        getRequestedUser(user.email);
        await dispatch(fetchUsers(currentUser.email));
        setFollowLoading(false)
        document.activeElement.blur();
    };

    useEffect(() => {
        const getPost = async () => {
            setLoading(true);
            await onSnapshot(
                query(
                    collection(dataBase, "posts"),
                    where("postOwner", "==", user.email),
                    orderBy("timestamp", "desc")
                ),
                async (snapshot) => setTweetPost(snapshot.docs.map((doc) => doc.data()))
            );
            await onSnapshot(collection(dataBase, "users"), async (snapshot) =>
                setPostOwners(await snapshot.docs.map((doc) => doc.data()))
            );
            setLoading(false);
        };
        getPost().then(r => r);
    }, []);

    return (
        <div className={styles.wrapper}>
            {/* Head Section */}
            <div className={`${styles.headWrapper} flex gap-2 p-1 items-center`}>
				<span
                    className={styles.icon}
                    onClick={(e) => {
                        e.preventDefault();
                        router.back();
                    }}
                >
					<IoArrowBack/>
				</span>
                <div className="flex flex-col">
					<span className="text-xl font-semibold">
						{user.firstName} {user.lastName}
					</span>
                    <span className="text-sm">{user.tweets.length} Tweets</span>
                </div>
            </div>
            {/* Cover Section */}
            <Cover followLoading={followLoading} follow={follow} userType={userType} user={user}
                   currentUser={currentUser}/>
            {!loading ? (
                tweetPost.map((tweet, index) => {
                    const postOwner = postOwners.find((owner) => owner.email === tweet.postOwner);
                    if (tweet && postOwner)
                        return (
                            <Posts
                                key={index}
                                displayName={postOwner?.firstName}
                                username={postOwner?.customId}
                                text={tweet?.tweetMessage}
                                userId={postOwner.customId}
                                avatar={postOwner?.avatar}
                                timestamp={tweet?.timestamp}
                                tweetmedia={tweet?.tweetImage}
                                likesCount={tweet?.likesCount}
                                likes={tweet.likes}
                                tweetId={tweet.tweetId}
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
        </div>
    );
};

export default ProfilePage;
