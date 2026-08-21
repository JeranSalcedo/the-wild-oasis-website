"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import type { BookingInsertData } from "../types/booking-data.types";

import { insertBooking } from "../api/bookings.api";

export const createBooking = async (
	reservationData: BookingInsertData,
	formData: FormData,
) => {
	const session = await auth();

	if (!session) throw new Error("You must be logged in");

	const { date_start, date_end, nights_count, price_cabin, cabin_id } =
		reservationData;

	/* TO ADD
     
    Check for existing bookings for the cabin and ensure that the new booking has no overlapping dates

     */

	const guests_count = Number(formData.get("guestsCount"));
	const observations = String(formData.get("observations")).slice(0, 1000);

	const guest_id = session.user.guestId;

	const bookingData = {
		status: "unconfirmed",
		date_start,
		date_end,
		nights_count,
		guests_count,
		price_cabin,
		price_extras: 0,
		price_total: price_cabin,
		breakfast_included: false,
		paid: false,
		observations,
		cabin_id,
		guest_id,
	};

	await insertBooking(bookingData);

	revalidatePath(`/cabins/${cabin_id}`);
	revalidatePath("/account/reservations");
};
