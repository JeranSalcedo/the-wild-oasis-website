import { Suspense } from "react";

import { Bookings } from "@/features/bookings";
import { Heading } from "@/components/Heading";
import { Spinner } from "@/components/Spinner";

export const metadata = {
	title: "Reservations",
	description: "Mange your reservations.",
};

export default function Page() {
	return (
		<div className="py-8 pr-5">
			<Heading level={2}>Your reservations</Heading>

			<Suspense fallback={<Spinner />}>
				<Bookings />
			</Suspense>
		</div>
	);
}
