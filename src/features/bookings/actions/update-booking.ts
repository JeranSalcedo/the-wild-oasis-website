"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { getBookingById, updateBookingById } from "../api/bookings.api";

export const updateBooking = async (data: FormData) => {
	const session = await auth();

	if (!session) throw new Error("You must be logged in");

	const guestId = session.user.guestId;

	const bookingId = Number(data.get("reservationId"));

	const booking = await getBookingById(bookingId);

	if (booking.guestId !== guestId)
		throw new Error("You are not allowed to update this booking");

	const guests_count = Number(data.get("guestsCount"));
	const observations = String(data.get("observations")).slice(0, 1000);

	await updateBookingById({
		guestId,
		bookingId,
		updateData: { guests_count, observations },
	});

	revalidatePath("/account/reservations");
	revalidatePath(`/account/reservations/edit/${bookingId}`);

	redirect("/account/reservations");
};
