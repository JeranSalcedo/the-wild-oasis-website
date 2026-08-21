import Link from "next/link";
import { auth } from "@/auth";

import type { CabinType } from "@/features/cabins";

import { getBookedDatesByCabinId } from "../api/bookings.api";
import { getSettings } from "@/features/settings";

import { DateSelector } from "./DateSelector";
import { ReservationForm } from "./ReservationForm";

type ReservationProps = {
	cabin: CabinType;
};

export const Reservation = async ({ cabin }: ReservationProps) => {
	const session = await auth();
	const user = session?.user;

	const { id: cabinId, basePrice, discount, maxCapacity } = cabin;

	const [bookings, settings] = await Promise.all([
		getBookedDatesByCabinId(cabinId),
		getSettings(),
	]);

	return (
		<div
			className={`flex flex-col items-center gap-x-1 gap-y-7 ${user && "md:flex-row md:items-start"}`}
		>
			<DateSelector
				basePrice={basePrice}
				discount={discount}
				bookings={bookings}
				settings={settings}
				loggedIn={!!user}
			/>
			{user ? (
				<ReservationForm
					user={user}
					cabinId={cabinId}
					basePrice={basePrice}
					discount={discount}
					maxCapacity={maxCapacity}
				/>
			) : (
				<div className="flex-1 bg-primary-800">
					<p className="self-center px-4 py-5 text-center text-base sm:px-5 sm:py-6 sm:text-lg">
						Please{" "}
						<Link
							href={`/login?callbackUrl=${encodeURIComponent(`/cabins/${cabinId}`)}`}
							className="text-accent-500 underline"
						>
							login
						</Link>{" "}
						to reserve this cabin right now
					</p>
				</div>
			)}
		</div>
	);
};
