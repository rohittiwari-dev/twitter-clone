import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";

const Login = () => {
	const { data: session } = useSession();
	const route = useRouter();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		if (session) route.push("/");
		else setLoading(false);
	}, [session, route]);

	async function handleLogin() {
		setLoading(true);
		signIn("google");
	}

	return (
		<>
			<Head>
				<title>Login / Twitter</title>
				<meta charSet="UTF-8" />
				<link rel="shortcut icon" href="//abs.twimg.com/favicons/twitter.2.ico" />
				<meta
					name="viewport"
					content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
				/>
				<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
			</Head>
			<main className=" h-screen w-screen flex justify-center items-center">
				{loading ? (
					<ImSpinner9 color={"#1DA1F2"} size="30" className="text-center animate-spin" />
				) : (
					<div
						className="w-40 h-10 font-bold bg-white text-cyan-900 text-center flex justify-center items-center cursor-pointer"
						onClick={handleLogin}
					>
						<BsGoogle /> &nbsp;Google singIn
					</div>
				)}
			</main>
		</>
	);
};

export default Login;
