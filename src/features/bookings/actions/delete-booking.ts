"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { deleteBookingById, getBookingById } from "../api/bookings.api";

export const deleteBooking = async (bookingId: number) => {
	const session = await auth();

	if (!session) throw new Error("You must be logged in");

	const guestId = session.user.guestId;
	const booking = await getBookingById(bookingId);

	if (booking.guestId !== guestId)
		throw new Error("You are not allowed to delete this booking");

	await deleteBookingById({ guestId, bookingId });

	revalidatePath(`/cabins/${booking.cabinId}`);
	revalidatePath("/account/reservations");
};
