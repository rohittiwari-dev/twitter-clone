import Widget from "@/components/Home/Widget";
import ProfilePage from "@/components/Profile/ProfilePage";
import Sidebar from "@/components/sidebar/Sidebar";
import {fetchUsers} from "@/redux/reduxActions";
import dataBase from "@/firebase";
import {collection, getDocs, query, where} from "firebase/firestore";
import {getSession, useSession} from "next-auth/react";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import {ImSpinner9} from "react-icons/im";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";

const styles = {
    wrapper: `lg:max-w-7xl m-auto flex items-center justify-center h-screen bg-[#00000] text-white overflow-hidden`,
    content: `grid grid-cols-9 w-full`,
};

const ProfileDetails = (props) => {
    const router = useRouter();
    const profileId = "@" + router.query.profileId;
    const dispatch = useDispatch();
    const currentUserData = useSelector((state) => state.logedinUser.data);
    const [requestedUser, setRequestedUser] = useState(null);
    const {data: session} = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUserData || currentUserData.length === 0) {
            const fetchUser = async () => await dispatch(fetchUsers(session.user.email));
            fetchUser();
        }
    }, [dispatch, session, currentUserData]);

    useEffect(() => {
        const getUser = async () => {
            const user = (
                await getDocs(query(collection(dataBase, "users"), where("customId", "==", profileId)))
            ).docs[0].data();
            if (user) {
                await setRequestedUser(user);
                setLoading(false);
            }
        };
        getUser().then(r => r);
    }, [profileId]);
    const getRequested = async (requestedUserId) => {
        const user = (
            await getDocs(query(collection(dataBase, "users"), where("email", "==", requestedUserId)))
        ).docs[0].data();
        if (user) {
            await setRequestedUser(user);
            setLoading(false);
        }
    };
    return (
        <>
            {loading ? (
                <div className={styles.wrapper}>
                    <ImSpinner9 color={"#1DA1F2"} size="30" className="text-center animate-spin"/>
                </div>
            ) : (
                <>
                    <Head>
                        <title>
                            {requestedUser.firstName +
                                " " +
                                requestedUser.lastName +
                                " (" +
                                requestedUser.customId.replace("@", "") +
                                ") "}
                            / Twitter (Clone)
                        </title>
                        <meta charSet="UTF-8"/>
                        <link rel="shortcut icon" href="https://abs.twimg.com/favicons/twitter.2.ico"/>
                        <meta
                            name="viewport"
                            content="width=device-width,  initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0"
                        />
                        <meta name="description"
                              content="This is Twitter Clone Application Made for Learning and Fun Anything Done Related to this not under our control"/>
                        <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                    </Head>
                    <main className={styles.wrapper}>
                        <div className={styles.content}>
                            <Sidebar
                                user={currentUserData}
                                activeLink={profileId === currentUserData.customId ? "Profile" : ""}
                            />
                            <div
                                className=" will-change-scroll grid grid-cols-9 col-span-9 sm:col-span-7 h-screen overflow-auto scroll-smooth scrollbar-hide">
                                <ProfilePage
                                    user={requestedUser}
                                    getRequestedUser={getRequested}
                                    userType={profileId === currentUserData.customId ? "owner" : null}
                                />
                                <Widget/>
                            </div>
                        </div>
                    </main>
                </>
            )}
        </>
    );
};


export async function getServerSideProps({req, res}) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    const session = await getSession({req});
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    return {
        props: {
            session,
        },
    };
}

export default ProfileDetails;