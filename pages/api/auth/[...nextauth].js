import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.NEXTAUTH_GOOGLE_CLIENTID,
			clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENTSECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
		// ...add more providers here
	],
	secret: process.env.NEXTAUTH_SECRET.toString(),
};

export default NextAuth(authOptions);
