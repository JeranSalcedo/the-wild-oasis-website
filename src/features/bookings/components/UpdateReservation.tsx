import { notFound } from "next/navigation";

import { getBookingWithCabinById } from "../api/bookings.api";
import { updateBooking } from "../actions/update-booking";

import { FormElements } from "./FormElements";

type UpdateReservationProps = {
	reservationId: number;
};

export const UpdateReservation = async ({
	reservationId,
}: UpdateReservationProps) => {
	const booking = await getBookingWithCabinById(reservationId);

	if (!booking) return notFound();

	return (
		<form
			action={updateBooking}
			className="flex flex-col gap-4 bg-primary-900 px-8 py-4 sm:gap-5 sm:px-10 sm:py-6 md:gap-6 md:px-12 md:py-8"
		>
			<input type="hidden" name="reservationId" value={reservationId} />

			<FormElements
				guestsCount={booking.guestsCount}
				observations={booking.observations}
				maxCapacity={booking.cabin.maxCapacity}
			/>
		</form>
	);
};
