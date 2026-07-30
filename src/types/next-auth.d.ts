import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: DefaultSession["user"] & {
			guestId: number;
		};
	}

	interface User {
		guestId: number;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		guestId: number;
	}
}
