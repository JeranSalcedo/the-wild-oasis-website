import { mapCabin } from "@/features/cabins";
import { mapGuest } from "@/features/guests";

import type { Booking, BookingWithCabinAndGuest } from "../types/booking.types";
import type {
	BookingData,
	BookingWithCabinAndGuestData,
} from "../types/booking-data.types";

export const mapBooking = (data: BookingData): Booking => {
	return {
		id: data.id,
		createdAt: data.created_at,
		status: data.status,
		dateStart: data.date_start,
		dateEnd: data.date_end,
		nightsCount: data.nights_count,
		guestsCount: data.guests_count,
		priceCabin: data.price_cabin,
		priceExtras: data.price_extras,
		priceTotal: data.price_total,
		breakfastIncluded: data.breakfast_included,
		paid: data.paid,
		observations: data.observations,
		cabinId: data.cabin_id,
		guestId: data.guest_id,
	};
};

export const mapBookingWithCabinAndGuest = (
	data: BookingWithCabinAndGuestData,
): BookingWithCabinAndGuest => {
	return {
		...mapBooking(data),
		cabin: mapCabin(data.cabins),
		guest: mapGuest(data.guests),
	};
};
