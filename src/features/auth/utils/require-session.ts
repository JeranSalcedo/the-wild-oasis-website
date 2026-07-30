import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const requireSession = async () => {
	const session = await auth();

	if (!session) redirect("/login");

	return session;
};
