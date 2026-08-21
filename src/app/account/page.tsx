import { requireSession } from "@/features/auth";

import { Heading } from "@/components/Heading";

export const metadata = {
	title: "Guest area",
	description:
		"Manage your account settings and preferences at The Wild Oasis",
};

export default async function Page() {
	const session = await requireSession();

	return (
		<div className="py-8 pr-5">
			<Heading level={2}>
				Welcome, {session.user?.name ?? "Guest"}
			</Heading>
		</div>
	);
}
