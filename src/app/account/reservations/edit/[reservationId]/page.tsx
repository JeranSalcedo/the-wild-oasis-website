import { Metadata } from "next";

import { Suspense } from "react";

import { getBookingWithCabinById } from "@/features/bookings/api/bookings.api";

import { Heading } from "@/components/Heading";
import { UpdateReservation } from "@/features/bookings";
import { Spinner } from "@/components/Spinner";

type PageProps = {
	params: {
		reservationId: string;
	};
};

export const generateMetadata = async ({
	params,
}: PageProps): Promise<Metadata> => {
	const reservationId = Number(params.reservationId);
	const booking = await getBookingWithCabinById(reservationId);

	if (!booking)
		return {
			title: "Reservation Not Found",
		};

	return {
		title: `Reservation #${reservationId}`,
		description: "Update your reservation",
	};
};

export default function Page({ params }: PageProps) {
	const reservationId = Number(params.reservationId);

	return (
		<div className="py-8 pr-5">
			<Heading level={2}>Edit Reservation #{reservationId}</Heading>

			<Suspense key={reservationId} fallback={<Spinner />}>
				<UpdateReservation reservationId={reservationId} />
			</Suspense>
		</div>
	);
}
