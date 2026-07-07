import { Suspense } from "react";

import { Heading } from "@/components/Heading";
import { Spinner } from "@/components/Spinner";
import { CabinList } from "@/features/cabins";

// revalidate every hour
export const revalidate = 3600;

export const metadata = {
	title: "Cabins",
	description: "Information about the cabins at The Wild Oasis",
};

export default function Page() {
	return (
		<div className="mx-10">
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

			<Suspense fallback={<Spinner />}>
				<CabinList />
			</Suspense>
		</div>
	);
}
