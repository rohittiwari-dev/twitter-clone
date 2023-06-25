import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {ImSpinner9} from "react-icons/im";
import Head from "next/head";
import Sidebar from "@/components/sidebar/Sidebar";
import Widget from "@/components/Home/Widget";
import {fetchUsers} from "@/redux/reduxActions";
import {useDispatch, useSelector} from "react-redux";
import {getSession, useSession} from "next-auth/react";
import {IoArrowBack} from "react-icons/io5";

const TweetBoxStyles = {
    wrapper: `col-span-9 sm:col-span-7 lg:col-span-5  border-r will-change-scroll border-l border-[#38444d]/60 sticky top-0 w-full h-screen min-h-full scroll-smooth scrollbar-hide overflow-y-auto`,
    headWrapper: `sticky right-0 w-full left-0 bg-black/70 m-0 backdrop-contrast-75 backdrop-brightness-75 border-b border-[#38444d]/60  top-0 backdrop-blur z-10`,
    icon: `font-bold text-[1.2rem] rounded-full w-9 h-9 hover:bg-[#191919] flex justify-center items-center`,
};
const styles = {
    wrapper: `lg:max-w-7xl flex items-center justify-center m-auto h-screen bg-[#00000] text-white overflow-hidden`,
    content: `grid grid-cols-9 w-full`,
};
const Notifications = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const currentUserData = useSelector((state) => state.logedinUser.data);
    const {data: session} = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUserData || currentUserData.length === 0) {
            const fetchUser = async () => {
                dispatch(fetchUsers(session.user.email));
            };
            fetchUser();
        }
    }, [dispatch, session, currentUserData]);
    useEffect(() => {
        if (currentUserData || Object.keys(currentUserData).length > 0)
            setLoading(false)
    }, [currentUserData]);


    return (
        <>
            {loading ? (
                <div className={styles.wrapper}>
                    <ImSpinner9 color={"#1DA1F2"} size="30" className="text-center animate-spin"/>
                </div>) : (
                <>
                    <Head>
                        <title>Bookmarks / Twitter
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
                            <Sidebar activeLink={"Notifications"} user={currentUserData}/>
                            <div
                                className="w-full will-change-scroll grid grid-cols-9 col-span-9 sm:col-span-7 h-screen overflow-auto scroll-smooth scrollbar-hide">
                                <div className={TweetBoxStyles.wrapper}>
                                    <div
                                        className={`${TweetBoxStyles.headWrapper} flex gap-3 p-2 items-center`}
                                    >
										<span
                                            className={TweetBoxStyles.icon}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.back();
                                            }}
                                        >
											<IoArrowBack/>
										</span>
                                        <div className="flex flex-col">
                                            <span className="text-xl font-semibold">Notifications</span>
                                        </div>
                                    </div>
                                </div>
                                <Widget/>
                            </div>
                        </div>
                    </main>
                </>
            )
            }
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

export default Notifications;
