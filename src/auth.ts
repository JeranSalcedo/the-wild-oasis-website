import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { getGuest, createGuest } from "@/features/guests";

export const {
	auth,
	handlers: { GET, POST },
	signIn,
	signOut,
} = NextAuth({
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID!,
			clientSecret: process.env.AUTH_GOOGLE_SECRET!,
		}),
	],
	callbacks: {
		authorized: async ({ auth }) => !!auth,
		signIn: async ({ user }) => {
			try {
				const guest = await getGuest(user.email!);

				if (!guest) {
					await createGuest({
						full_name: user.name,
						email: user.email,
					});
				}

				return true;
			} catch {
				return false;
			}
		},
		jwt: async ({ token }) => {
			if (token.email) {
				const guest = await getGuest(token.email);

				if (guest) token.guestId = guest.id;
			}

			return token;
		},
		session: ({ session, token }) => {
			session.user.guestId = token.guestId as number;

			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
});
