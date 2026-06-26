import { Heading } from "@/components/Heading";

export const metadata = {
	title: "Guest area",
	description:
		"Manage your account settings and preferences at The Wild Oasis",
};

export default function Page() {
	return <Heading level={2}>Welcome, %NAME%</Heading>;
}
