import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.NEXTAUTH_GOOGLE_CLIENTID,
			clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENTSECRET,
		}),
		// ...add more providers here
	],
	secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
