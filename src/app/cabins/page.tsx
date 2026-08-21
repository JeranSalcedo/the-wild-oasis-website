import { Suspense } from "react";

import { CabinFilter, CabinList, getCabinFilter } from "@/features/cabins";

import { Heading } from "@/components/Heading";
import { Spinner } from "@/components/Spinner";

import { ReservationReminder } from "@/features/bookings";

type PageProps = {
	searchParams: {
		capacity?: string;
	};
};

export const metadata = {
	title: "Cabins",
	description: "Information about the cabins at The Wild Oasis",
};

export default function Page({ searchParams }: PageProps) {
	const filter = getCabinFilter(searchParams.capacity);

	return (
		<div className="overflow-y-auto px-10 py-8">
			<Heading>Our Luxury Cabins</Heading>
			<p className="mb-4 sm:mb-6 md:mb-8">
				Cozy yet luxurious cabins, located right in the heart of the
				Italian Dolomites. Imagine waking up to beautiful mountain
				views, enjoying a cup of coffee on your private balcony, and
				spending your days exploring the stunning natural surroundings.
				Our cabins are designed to provide the perfect blend of comfort
				and rustic charm, making them the ideal retreat for nature
				lovers and adventure seekers alike.
			</p>

			<div className="mb-4 flex justify-center sm:mb-5 sm:justify-end md:mb-6">
				<CabinFilter />
			</div>

			<Suspense key={filter} fallback={<Spinner />}>
				<CabinList filter={filter} />
				<ReservationReminder />
			</Suspense>
		</div>
	);
}
