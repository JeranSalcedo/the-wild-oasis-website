import { supabase } from "@/lib/supabase/server";

import type { Booking, BookingWithCabin } from "../types/booking.types";
import type {
	BookingInsertData,
	BookingUpdateData,
} from "../types/booking-data.types";

import { mapBooking, mapBookingWithCabin } from "./bookings.mapper";

export const insertBooking = async (
	bookingData: BookingInsertData,
): Promise<Booking> => {
	const { data, error } = await supabase
		.from("bookings")
		.insert([bookingData])
		.select()
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return mapBooking(data);
};

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

export const getBookingById = async (id: number): Promise<Booking> => {
	const { data, error } = await supabase
		.from("bookings")
		.select(
			"id, created_at, status, date_start, date_end, nights_count, guests_count, price_cabin, price_extras, price_total, breakfast_included, paid, observations, cabin_id, guest_id",
		)
		.eq("id", id)
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return mapBooking(data);
};

export const getBookingWithCabinById = async (
	id: number,
): Promise<BookingWithCabin | null> => {
	const { data, error } = await supabase
		.from("bookings")
		.select(
			"id, created_at, status, date_start, date_end, nights_count, guests_count, price_cabin, price_extras, price_total, breakfast_included, paid, observations, cabin_id, guest_id, cabins(id, created_at, name, description, image_url, max_capacity, base_price, discount)",
		)
		.eq("id", id)
		.single();

	if (error) {
		if (error.code === "PGRST116") return null;

		throw new Error(error.message);
	}

	return mapBookingWithCabin(data);
};

export const getBookingsByGuestId = async (
	guestId: number,
): Promise<BookingWithCabin[]> => {
	const { data, error } = await supabase
		.from("bookings")
		.select(
			"id, created_at, status, date_start, date_end, nights_count, guests_count, price_cabin, price_extras, price_total, breakfast_included, paid, observations, cabin_id, guest_id, cabins(id, created_at, name, description, image_url, max_capacity, base_price, discount)",
		)
		.eq("guest_id", guestId)
		.order("id")
		.order("date_start");

	if (error) {
		throw new Error(error.message);
	}

	return (data ?? []).map(mapBookingWithCabin);
};

export const updateBookingById = async ({
	guestId,
	bookingId,
	updateData,
}: {
	guestId: number;
	bookingId: number;
	updateData: BookingUpdateData;
}): Promise<Booking> => {
	const { data, error } = await supabase
		.from("bookings")
		.update(updateData)
		.eq("id", bookingId)
		.eq("guest_id", guestId)
		.select()
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return mapBooking(data);
};

export const deleteBookingById = async ({
	guestId,
	bookingId,
}: {
	guestId: number;
	bookingId: number;
}): Promise<void> => {
	const { error } = await supabase
		.from("bookings")
		.delete()
		.eq("id", bookingId)
		.eq("guest_id", guestId);

	if (error) {
		throw new Error(error.message);
	}
};
