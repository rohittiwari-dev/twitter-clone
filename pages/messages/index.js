import {useRouter} from "next/router";
import React from "react";
import {IoArrowBack} from "react-icons/io5";
import {getSession} from "next-auth/react";

const Messages = (props) => {
    const router = useRouter();
    return (
        <div>
			<span
                className={
                    "font-bold text-[1.2rem] rounded-full w-9 h-9 hover:bg-[#191919] flex justify-center items-center"
                }
                onClick={(e) => {
                    e.preventDefault();
                    router.back();
                }}
            >
				<IoArrowBack/>
			</span>
            Hello I am Messages
        </div>
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

export default Messages;
