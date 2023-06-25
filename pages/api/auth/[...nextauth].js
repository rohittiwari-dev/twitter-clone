import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from "@/firebase";

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
                    response_type: "code"
                }
            }
        }),
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const {email, password} = credentials;
                try {
                    const authentication = await signInWithEmailAndPassword(auth, email, password);
                    return authentication.user;
                } catch (e) {
                    throw new Error(e.message);
                }
            },
        })
        // ...add more providers here
    ],
    callbacks: {
        async session({session, token, user}) {
            session.user.id = token.id;
            session.accessToken = token.sub;
            return session;
        },
        async jwt({token, user, account, profile, isNewUser}) {
            if (user) {
                token.id = user.id;
            }
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
    },
    pages: {
        signIn: '/login',
        signOut: '/',
        error: "/login"
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
