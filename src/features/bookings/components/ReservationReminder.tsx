"use client";

import { format } from "date-fns";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { useReservation } from "../contexts/ReservationContext";

export const ReservationReminder = () => {
	const { range, resetRange } = useReservation();

	if (!range?.from || !range?.to) return null;

	return (
		<div className="fixed bottom-4 left-1/2 flex -translate-x-1/2 flex-nowrap items-center gap-3 whitespace-nowrap rounded-full bg-accent-500 px-5 py-3 text-xs font-semibold text-primary-800 shadow-xl shadow-slate-900 sm:bottom-5 sm:gap-4 sm:px-6 sm:py-4 sm:text-sm">
			<p>
				Don&apos;t forget to reserve your dates <br /> from{" "}
				{format(new Date(range.from), "MMM dd yyyy")} to{" "}
				{format(new Date(range.to), "MMM dd yyyy")}
			</p>
			<button
				className="rounder-full p-1 hover:bg-accent-600"
				onClick={resetRange}
			>
				<XMarkIcon className="h-5 w-5" />
			</button>
		</div>
	);
};
