import { mapCabin } from "@/features/cabins";
import { mapGuest } from "@/features/guests";

import type {
	Booking,
	BookingWithCabin,
	BookingWithCabinAndGuest,
} from "../types/booking.types";
import type {
	BookingData,
	BookingWithCabinAndGuestData,
	BookingWithCabinData,
} from "../types/booking-data.types";

export const mapBooking = (data: BookingData): Booking => {
	return {
		id: data.id,
		createdAt: data.created_at,
		status: data.status ?? "",
		dateStart: data.date_start ? `${data.date_start}Z` : "",
		dateEnd: data.date_end ? `${data.date_end}Z` : "",
		nightsCount: data.nights_count ?? 0,
		guestsCount: data.guests_count ?? 0,
		priceCabin: data.price_cabin ?? 0,
		priceExtras: data.price_extras ?? 0,
		priceTotal: data.price_total ?? 0,
		breakfastIncluded: data.breakfast_included ?? false,
		paid: data.paid ?? false,
		observations: data.observations ?? "",
		cabinId: data.cabin_id ?? 0,
		guestId: data.guest_id ?? 0,
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

export const mapBookingWithCabin = (
	data: BookingWithCabinData,
): BookingWithCabin => {
	if (!data.cabins) {
		throw new Error("Booking cabin not found");
	}

	return {
		...mapBooking(data),
		cabin: mapCabin(data.cabins),
	};
};
