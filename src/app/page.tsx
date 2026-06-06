import Link from "next/link";

export default function Page() {
	return (
		<main className="relative min-h-screen overflow-hidden">
			<div className="fixed inset-0 bg-[url('/bg.png')] bg-cover bg-center bg-top bg-no-repeat" />
			<div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24">
				<div className="text-center">
					<h1 className="mb-10 text-8xl font-normal tracking-tight text-primary-50">
						Welcome to paradise.
					</h1>
					<Link
						href="/cabins"
						className="bg-accent-500 px-8 py-6 text-lg font-semibold text-primary-800 transition-colors duration-300 hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2"
					>
						Explore luxury cabins
					</Link>
				</div>
			</div>
		</main>
	);
}
