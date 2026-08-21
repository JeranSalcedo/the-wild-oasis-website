import { requireSession } from "@/features/auth";
import { getBookingsByGuestId } from "../api/bookings.api";
import { BookingList } from "./BookingList";

export const Bookings = async () => {
	const session = await requireSession();

	const guestId = session.user.guestId;
	const bookings = await getBookingsByGuestId(guestId);

	return <BookingList bookings={bookings} />;
};
