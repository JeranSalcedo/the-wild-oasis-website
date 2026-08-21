"use client";

import Image from "next/image";
import type { Session } from "next-auth";

import { createBooking } from "../actions/create-booking";
import { useReservation } from "../contexts/ReservationContext";
import { ReservationFormElements } from "./ReservationFormElements";

type ReservationFormProps = {
	user: NonNullable<Session["user"]>;
	cabinId: number;
	basePrice: number;
	discount?: number;
	maxCapacity: number;
};

export const ReservationForm = ({
	user: { name, image, email },
	cabinId,
	basePrice,
	discount = 0,
	maxCapacity,
}: ReservationFormProps) => {
	const { range, rangeSelected, nightsCount, isValid, resetRange } =
		useReservation();

	const priceCabin = (basePrice - discount) * nightsCount;

	const reservationData = {
		date_start: range?.from?.toISOString(),
		date_end: range?.to?.toISOString(),
		nights_count: nightsCount,
		price_cabin: priceCabin,
		cabin_id: cabinId,
	};
	const createBookingWithData = createBooking.bind(null, reservationData);

	const disabled = !rangeSelected || !isValid;

	return (
		<div className="flex-1">
			<div className="flex flex-col items-center justify-between gap-2.5 bg-primary-800 px-12 py-3 text-primary-300 sm:flex-row md:flex-col">
				<p className="text-sm sm:text-base md:text-sm lg:text-base">
					Logged in as {email}
				</p>

				<div className="flex items-center gap-3">
					<Image
						className="h-6 rounded-full"
						src={image ?? ""}
						alt={name ?? ""}
						width={24}
						height={24}
						referrerPolicy="no-referrer"
					/>
					<p className="text-sm sm:text-base md:text-sm lg:text-base">
						{name}
					</p>
				</div>
			</div>

			<form
				action={async (formData) => {
					await createBookingWithData(formData);
					resetRange();
				}}
				className="flex flex-col gap-5 bg-primary-900 px-8 py-6 sm:px-12 sm:py-8 md:px-8 md:py-6 lg:px-12 lg:py-8"
			>
				<ReservationFormElements
					maxCapacity={maxCapacity}
					rangeSelected={rangeSelected}
					disabled={disabled}
				/>
			</form>
		</div>
	);
};
