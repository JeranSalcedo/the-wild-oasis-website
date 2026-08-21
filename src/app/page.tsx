import { LinkButton } from "@/components/LinkButton";

export default function Page() {
	return (
		<main className="relative h-full items-center justify-center overflow-hidden py-8">
			<div className="fixed inset-0 bg-[url('/bg.png')] bg-cover bg-center bg-top bg-no-repeat" />
			<div className="relative z-10 px-6 py-36 text-center">
				<h1 className="mx-10 mb-10 text-7xl font-normal tracking-tight text-primary-50 md:text-8xl">
					Welcome to paradise.
				</h1>

				<LinkButton href="/cabins" type="regular">
					Explore luxury cabins
				</LinkButton>
			</div>
		</main>
	);
}
