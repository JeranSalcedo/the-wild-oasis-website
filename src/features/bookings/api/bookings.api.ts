import { supabase } from "@/lib/supabase/server";

import type { Booking } from "../types/booking.types";

import { mapBooking } from "./bookings.mapper";

export const getBookedDatesByCabinId = async (
	cabinId: number,
): Promise<Booking[]> => {
	const today = new Date();
	today.setUTCHours(0, 0, 0, 0);

	const { data, error } = await supabase
		.from("bookings")
		.select(
			"id, created_at, status, date_start, date_end, nights_count, guests_count, price_cabin, price_extras, price_total, breakfast_included, paid, observations, cabin_id, guest_id",
		)
		.eq("cabin_id", cabinId)
		.or(`date_start.gte.${today.toISOString()},status.eq.checked-in`);

	if (error) {
		throw new Error(error.message);
	}

	return (data ?? []).map(mapBooking);
};
