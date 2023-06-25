import Head from "next/head";
import Sidebar from "@/components/sidebar/Sidebar";
import Feed from "@/components/Home/Feed";
import Widget from "@/components/Home/Widget";
import {getSession, useSession} from "next-auth/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "@/redux/reduxActions";
import {STATES} from "@/utils/enums";
import {ImSpinner9} from "react-icons/im";
import {doc, getDoc, setDoc} from "firebase/firestore";
import dataBase, {auth} from "@/firebase";
import {createUserWithEmailAndPassword} from 'firebase/auth'


const styles = {
    wrapper: `lg:max-w-7xl flex items-center justify-center m-auto h-screen bg-[#00000] text-white overflow-hidden`,
    content: `grid grid-cols-9 w-full`,
};

export default function Home() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.logedinUser);
    const {data: session} = useSession();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 700);
    }, []);
    useEffect(() => {
        if (user.state === STATES.LOADING) {
            const fetchUser = async () => await dispatch(fetchUsers(session.user.email));
            fetchUser();
        }
    }, [dispatch, session, user]);

    return (
        <>
            <Head>
                <title>Home / Twitter (Clone)</title>
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
                {loading ? (
                    <ImSpinner9 color={"#1DA1F2"} size="30" className="text-center animate-spin"/>
                ) : (
                    <div className={styles.content}>
                        <Sidebar user={user.data} activeLink={"Home"}/>
                        <div
                            id="stopScroll"
                            className=" will-change-scroll grid grid-cols-9 col-span-9 sm:col-span-7 h-screen overflow-auto scroll-smooth scrollbar-hide"
                        >
                            <Feed user={user.data}/>
                            <Widget/>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

export async function getServerSideProps({req, res}) {
    const session = await getSession({req});
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    const userExist = await getDoc(doc(dataBase, "users", session.user.email));
    createUserWithEmailAndPassword(auth, session.user.email, session.user.email).then(res => res.user).catch(err => err);
    if (!userExist.exists()) {
        await setDoc(doc(dataBase, "users", session.user.email), {
            avatar: session.user.image,
            firstName: session.user.name.split(" ")[0],
            lastName: session.user.name.split(" ")[1],
            email: session.user.email,
            customId: `@${session.user.email.split("@")[0]}`,
            followers: [],
            followings: [],
            tweetsReplies: [],
            nftVerified: false,
            coverImage: "",
            timestamp: new Date(),
            tweets: [],
            verifiedNormal: false,
        });
    }
    return {
        props: {
            session,
        },
    };
}
