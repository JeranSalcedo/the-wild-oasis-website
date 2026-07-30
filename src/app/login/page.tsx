import { Heading } from "@/components/Heading";
import { SignInButton } from "@/features/auth";

type PageProps = {
	searchParams: {
		callbackUrl: string;
	};
};

export const metadata = {
	title: "Login",
	description: "Log in to access your guest area",
};

export default async function Page({ searchParams }: PageProps) {
	const callbackUrl = searchParams?.callbackUrl ?? "/";

	return (
		<div className="mt-10 flex flex-col items-center gap-5 py-8">
			<Heading level={2}>Sign in to access your guest area</Heading>
			<SignInButton callbackUrl={callbackUrl} />
		</div>
	);
}
