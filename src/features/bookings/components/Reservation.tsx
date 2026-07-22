import type { CabinType } from "@/features/cabins";

import { getBookedDatesByCabinId } from "../api/bookings.api";
import { getSettings } from "@/features/settings";

import { DateSelector } from "./DateSelector";
import { ReservationForm } from "./ReservationForm";

type ReservationProps = {
	cabin: CabinType;
};

export const Reservation = async ({ cabin }: ReservationProps) => {
	const { id: cabinId, basePrice, discount, maxCapacity } = cabin;

	const [bookings, settings] = await Promise.all([
		getBookedDatesByCabinId(cabinId),
		getSettings(),
	]);

	return (
		<div className="flex flex-col items-center gap-x-1 gap-y-7 md:flex-row md:items-start">
			<DateSelector
				basePrice={basePrice}
				discount={discount}
				bookings={bookings}
				settings={settings}
			/>
			<ReservationForm maxCapacity={maxCapacity} />
		</div>
	);
};
