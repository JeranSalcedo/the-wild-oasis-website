"use client";

import { useOptimistic } from "react";

import type { BookingWithCabin } from "../types/booking.types";

import { deleteBooking } from "../actions/delete-booking";

import { BookingCard } from "./BookingCard";
import { EmptyReservations } from "./EmptyReservations";

type BookingListProps = {
	bookings: BookingWithCabin[];
};

export const BookingList = ({ bookings }: BookingListProps) => {
	const [optimisticBookings, optimisticDelete] = useOptimistic(
		bookings,
		(currentBookings, bookingId) =>
			currentBookings.filter((booking) => booking.id !== bookingId),
	);

	const handleDelete = async (bookingId: number): Promise<void> => {
		optimisticDelete(bookingId);
		await deleteBooking(bookingId);
	};

	return optimisticBookings.length === 0 ? (
		<EmptyReservations />
	) : (
		<ul className="space-y-6">
			{optimisticBookings.map((booking) => (
				<BookingCard
					key={booking.id}
					booking={booking}
					onDelete={handleDelete}
				/>
			))}
		</ul>
	);
};
