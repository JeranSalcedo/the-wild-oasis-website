"use server";

import { signIn } from "@/auth";

export const signInAction = async (callbackUrl: string) => {
	await signIn("google", { redirectTo: callbackUrl });
};
