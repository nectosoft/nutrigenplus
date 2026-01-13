import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"

declare module "next-auth" {
    interface Session {
        user: {
            role: string
        } & DefaultSession["user"]
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Hardcoded credentials as requested
                const VALID_USERNAME = "nutrigenplus"
                const VALID_PASSWORD = "ORDERS777"

                if (
                    credentials?.username === VALID_USERNAME &&
                    credentials?.password === VALID_PASSWORD
                ) {
                    return {
                        id: "admin-1",
                        name: "NutriGen Admin",
                        email: "admin@nutrigenplus.bg",
                        role: "ADMIN",
                    }
                }

                return null
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            session.user.role = "ADMIN"
            return session
        },
        async jwt({ token }) {
            token.role = "ADMIN"
            return token
        }
    },
    session: { strategy: "jwt" },
    pages: {
        signIn: "/auth/login",
    }
})
