import { LinkButton } from "@/components/LinkButton";

export default function NotFound() {
	return (
		<main className="flex flex-col items-center justify-center gap-2.5 py-8 text-center sm:gap-5">
			<h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">
				This cabin could not be found.
			</h1>

			<LinkButton
				href="/cabins"
				className="px-4 py-1 sm:px-5 sm:py-2 md:px-6 md:py-3"
				type="regular"
			>
				Back to all cabins
			</LinkButton>
		</main>
	);
}
