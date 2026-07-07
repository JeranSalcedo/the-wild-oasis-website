"use client";

type ErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
	return (
		<main className="flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6">
			<h1 className="sm:text-2l text-xl font-semibold md:text-3xl">
				Something went wrong!
			</h1>
			<p>{error.message}</p>

			<button
				className="inline-block rounded-lg bg-accent-500 px-4 py-1 text-primary-800 hover:bg-accent-600 focus:outline-none focus:outline focus:outline-4 focus:outline-offset-4 focus:outline-accent-300 sm:px-5 sm:py-2 md:px-6 md:py-3"
				onClick={reset}
			>
				Try again
			</button>
		</main>
	);
}
