"use client";

import { useEffect, useMemo } from "react";
import { DayPicker } from "@daypicker/react";

import { useBreakpoint } from "@/contexts/BreakpointContext";
import { useReservation } from "../contexts/ReservationContext";

import { getInvalidDateModifiers } from "../utils/get-invalid-date-modifiers";

import type { Booking } from "../types/booking.types";
import type { Settings } from "@/features/settings";

import { Button } from "@/components/Button";
import { CustomDayButton } from "./CustomDayButton";

type DateSelectorProps = {
	basePrice: number;
	discount?: number;
	bookings: Booking[];
	settings: Settings;
	loggedIn: boolean;
};

export const DateSelector = ({
	basePrice,
	discount = 0,
	bookings,
	settings,
	loggedIn,
}: DateSelectorProps) => {
	const { sm, md, lg } = useBreakpoint();
	const {
		range,
		rangeSelected,
		nightsCount,
		setIsValid,
		setRange,
		resetRange,
	} = useReservation();
	const { bookingLengthMin, bookingLengthMax } = settings;

	const baseStyle = (!sm || (loggedIn && md)) && !lg;
	const navStyle = baseStyle ? "around" : undefined;
	const calendarsCount = baseStyle ? 1 : 2;

	const startDate = new Date();
	const endDate = new Date();
	endDate.setFullYear(endDate.getFullYear() + 5);

	const totalPrice = (basePrice - discount) * nightsCount;

	const displayClear = rangeSelected || !baseStyle;

	const bookedDates = bookings.map((booking) => ({
		from: new Date(booking.dateStart),
		to: new Date(booking.dateEnd),
	}));
	const disabledDates = [
		{ before: startDate },
		{ after: endDate },
		...bookedDates,
	];

	const invalidModifiers = useMemo(
		() => getInvalidDateModifiers(range, bookedDates),
		[range, bookedDates],
	);
	const invalidSelection = useMemo(
		() =>
			Object.values(invalidModifiers).some(
				(invalid) => invalid.length > 0,
			),
		[invalidModifiers],
	);

	useEffect(() => {
		setIsValid(!invalidSelection);
	}, [invalidSelection, setIsValid]);

	return (
		<div className="flex w-fit flex-col">
			<DayPicker
				className="place-self-center bg-primary-900"
				captionLayout="dropdown"
				navLayout={navStyle}
				numberOfMonths={calendarsCount}
				pagedNavigation={true}
				mode="range"
				fixedWeeks
				showOutsideDays
				min={bookingLengthMin + 1}
				max={bookingLengthMax}
				startMonth={startDate}
				endMonth={endDate}
				selected={range}
				disabled={disabledDates}
				onSelect={setRange}
				modifiers={{
					bookedDates,
					...invalidModifiers,
				}}
				components={{
					DayButton: CustomDayButton,
				}}
				excludeDisabled
			/>
			<div
				className={`flex items-center ${displayClear ? "justify-between" : "justify-center sm:justify-between md:justify-center lg:justify-between"} bg-accent-500 p-2 sm:p-3 md:p-2 lg:p-3`}
			>
				<div
					className={`flex gap-x-1 sm:gap-x-5 md:gap-x-1 lg:gap-x-5 ${displayClear && "flex-col sm:flex-row md:flex-col lg:flex-row"} text-primary-800`}
				>
					<div className="flex gap-1 sm:gap-3 md:gap-1 lg:gap-3">
						<div className="flex items-center gap-1">
							<span className="text-lg sm:text-xl md:text-lg lg:text-xl">
								${basePrice - discount}
							</span>
							{discount > 0 && (
								<span className="text-sm font-semibold text-primary-700 line-through sm:text-base md:text-sm lg:text-base">
									${basePrice}
								</span>
							)}
							<span className="text-sm sm:text-base md:text-sm lg:text-base">
								/night
							</span>
						</div>
						{rangeSelected && (
							<div className="bg-accent-600 px-1.5 py-1 text-lg sm:text-xl md:text-lg lg:text-xl">
								<span>&times;</span> <span>{nightsCount}</span>
							</div>
						)}
					</div>
					{rangeSelected && (
						<div className="flex items-center gap-1">
							<span className="text-sm font-bold uppercase sm:text-base md:text-sm lg:text-base">
								TOTAL
							</span>
							<span className="text-lg font-semibold sm:text-xl md:text-lg lg:text-xl">
								${totalPrice}
							</span>
						</div>
					)}
				</div>
				{displayClear && (
					<Button
						className="border border-primary-800 px-4 py-2 text-sm font-semibold sm:px-4 sm:py-2 md:px-4 md:py-2"
						onClick={resetRange}
						disabled={!rangeSelected}
					>
						Clear
					</Button>
				)}
			</div>
		</div>
	);
};
