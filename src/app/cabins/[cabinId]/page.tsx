import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Heading } from "@/components/Heading";
import { Spinner } from "@/components/Spinner";

import { Reservation } from "@/features/bookings";
import { Cabin, getCabin, getCabins } from "@/features/cabins";

type PageProps = {
	params: {
		cabinId: string;
	};
};

export const generateMetadata = async ({
	params,
}: PageProps): Promise<Metadata> => {
	const cabinId = Number(params.cabinId);
	const cabin = await getCabin(cabinId);

	if (!cabin)
		return {
			title: "Cabin Not Found",
		};

	return {
		title: `Cabin ${cabin.name}`,
		description: cabin.description,
	};
};

export const generateStaticParams = async () => {
	const cabins = await getCabins();

	const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

	return ids;
};

export default async function Page({ params }: PageProps) {
	const cabinId = Number(params.cabinId);
	const cabin = await getCabin(cabinId);

	if (!cabin) return notFound();

	const { name } = cabin;

	return (
		<div className="mx-10 max-w-6xl py-8">
			<Cabin cabin={cabin} />

			<Heading
				className="mb-5 text-center text-3xl font-semibold sm:mb-7 sm:text-4xl md:mb-10 md:text-5xl"
				level={2}
			>
				Reserve {name} today. Pay on arrival.
			</Heading>

			<Suspense fallback={<Spinner />}>
				<Reservation cabin={cabin} />
			</Suspense>
		</div>
	);
}
