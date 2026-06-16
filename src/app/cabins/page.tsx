import { Suspense } from "react";

import { Spinner } from "@/components/Spinner";
import { CabinList } from "@/features/cabins";

export const metadata = {
	title: "Cabins",
	description: "Information about the cabins at The Wild Oasis",
};

export default function Page() {
	return (
		<div>
			<h1 className="text-4xl font-medium text-accent-400">
				Our Luxury Cabins
			</h1>
			<p className="mb-10 text-lg text-primary-200">
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
