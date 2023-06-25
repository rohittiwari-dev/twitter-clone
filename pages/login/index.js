import {getSession, signIn, useSession} from "next-auth/react";
import Head from "next/head";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {FcGoogle} from "react-icons/fc";
import {ImSpinner9} from "react-icons/im";
import {VscTwitter} from "react-icons/vsc";
import {FaGithub} from "react-icons/fa";

const Login = (props) => {
    const {data: session} = useSession();
    const route = useRouter();
    const [error, setError] = useState(route.query.error || "");
    const [loginCredentials, setLoginCredentials] = useState({email: "", password: ""});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (session) route.push("/");
        else setLoading(false);
    }, [session, route]);

    async function handleLogin() {
        setLoading(true);
        const status = await signIn("google", {redirect: false});
    }

    return (
        <>
            <Head>
                <title>Login / Twitter</title>
                <meta charSet="UTF-8"/>
                <link rel="shortcut icon" href="//abs.twimg.com/favicons/twitter.2.ico"/>
                <meta
                    name="viewport"
                    content="width=device-width,  initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0"
                />
                <meta name="description"
                      content="This is Twitter Clone Application Made for Learning and Fun Anything Done Related to this not under our control"/>
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            </Head>
            <main className=" h-screen bg-sky-500 w-screen flex justify-center items-center">
                {loading ? (
                    <ImSpinner9 color={"#FFFFFF"} size="30" className="text-center animate-spin"/>
                ) : (
                    <div
                        className={"text-lg shadow-2xl shadow-neutral-800 flex flex-col items-stretch relative px-5 py-10 rounded-2xl container sm:m-0 sm:w-3/4 md:w-1/2 mx-2 bg-black"}>
                        <VscTwitter className={"text-6xl mx-auto"}/>
                        <p className={"font-medium mt-2 text-xl text-white sm:text-2xl text-center"}>Sign in to
                            Twitter</p>
                        <div
                            className="px-4 mx-auto mt-3 hover:bg-sky-50 w-fit min-w-max rounded-full h-10 sm:font-medium bg-white text-black text-center flex justify-center items-center cursor-pointer"
                            onClick={handleLogin}
                        >
                            <FcGoogle/> &nbsp; Sign in with Google
                        </div>
                        <div
                            className="px-4 mx-auto mt-3 hover:bg-sky-50 w-fit min-w-max rounded-full h-10 sm:font-medium bg-white text-black text-center flex justify-center items-center cursor-pointer"
                            onClick={() => {
                                setError("Sorry for Inconvenience, Github is Disabled for the time being")
                                setTimeout(() => setError(""), 3500);
                            }}
                        >
                            <FaGithub/> &nbsp; Sign in with Github
                        </div>
                        <div
                            className={"h-[0.05rem] rounded-full flex justify-center items-center bg-gray-400/80 my-6 mx-6 "}>
                            <p className={"bg-black px-2 select-none"}>or</p></div>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            setLoading(true)
                            const status = await signIn('credentials', {
                                ...loginCredentials,
                                redirect: false,
                                callbackUrl: "/"
                            })
                            if (status.ok) setError("")
                            else {
                                setError(status.error)
                                setTimeout(() => setError(""), 3500);
                            }
                            setLoading(false)
                        }}>
                            <div
                                className={"relative flex justify-center items-center focus-within:ring-2 ring-1 ring-gray-700 focus-within:ring-blue-500 transition rounded h-12 w-full sm:w-2/3 sm:mx-auto mt-6"}>
                                <input required value={loginCredentials.email} onChange={(e) => setLoginCredentials({
                                    ...loginCredentials,
                                    email: e.target.value
                                })} type={"email"} placeholder={"email/username"}
                                       className={"w-full h-full text-center pt-4 placeholder:text-transparent peer/pass self-end bg-transparent outline-none py-1 px-2 text-base"}
                                       id={"username"} name={"username"}/>
                                <label htmlFor={"username"}
                                       className={"absolute transition-all left-1 top-0 peer-focus/pass:left-1 peer-focus/pass:top-0 peer-placeholder-shown/pass:left-auto pointer-events-none select-none peer-placeholder-shown/pass:top-auto peer-focus/pass:text-sm text-sm text-gray-300 peer-placeholder-shown/pass:text-lg peer-focus/pass:text-blue-300 "}>Enter
                                    Email/Username </label>
                            </div>
                            <div
                                className={"relative flex justify-center items-center focus-within:ring-2 ring-1 ring-gray-700 focus-within:ring-blue-500 transition rounded h-12 w-full sm:w-2/3 sm:mx-auto mt-6"}>
                                <input required value={loginCredentials.password} onChange={(e) => setLoginCredentials({
                                    ...loginCredentials,
                                    password: e.target.value
                                })} type={"password"} placeholder={"password"}
                                       className={"w-full h-full text-center pt-4 placeholder:text-transparent peer/pass self-end bg-transparent outline-none py-1 px-2 text-base"}
                                       id={"password"} name={"password"}/>
                                <label htmlFor={"password"}
                                       className={"absolute transition-all left-1 top-0 peer-focus/pass:left-1 peer-focus/pass:top-0 peer-placeholder-shown/pass:left-auto pointer-events-none select-none peer-placeholder-shown/pass:top-auto peer-focus/pass:text-sm text-sm text-gray-300 peer-placeholder-shown/pass:text-lg peer-focus/pass:text-blue-300 "}>Enter
                                    Password </label>
                            </div>
                            <button type={"submit"}
                                    className="px-12 mt-6 mx-auto hover:bg-sky-50 w-1/2 min-w-max rounded-full h-10 font-medium bg-white text-black text-center flex justify-center items-center cursor-pointer"

                            >
                                Login
                            </button>
                        </form>
                        {error !== "" ? (
                            <div
                                className={"bg-sky-600 absolute bottom-[-1rem] self-center shadow-blue-600 px-4 py-2 rounded shadow-xl"}>{error}</div>
                        ) : (<></>)}
                    </div>
                )}
            </main>
        </>
    );
};

export async function getServerSideProps({req, res}) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    const session = await getSession({req});
    if (session) {
        return {
            redirect: {
                destination: "/",
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

export default Login;
