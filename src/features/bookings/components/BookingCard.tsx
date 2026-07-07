import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, isPast, isToday } from "date-fns";

import { formatDateFromNow } from "@/utils/date.utils";

import { BookingWithCabinAndGuest } from "../types/booking.types";

import { DeleteBooking } from "./DeleteBooking";

type BookingCardProps = {
	booking: BookingWithCabinAndGuest;
};

export const BookingCard = ({ booking }: BookingCardProps) => {
	const {
		id,
		createdAt: createdAtString,
		dateStart: dateStartString,
		dateEnd: dateEndString,
		nightsCount,
		guestsCount,
		priceTotal,
		cabin: { name, imageUrl },
	} = booking;

	const createdAt = new Date(createdAtString);
	const dateStart = new Date(dateStartString);
	const dateEnd = new Date(dateEndString);

	return (
		<div className="flex flex-col border border-primary-800 md:flex-row">
			<div className="relative aspect-square h-32">
				<img
					src={imageUrl}
					alt={`Cabin ${name}`}
					className="border-r border-primary-800 object-cover"
				/>
			</div>

			<div className="flex flex-grow flex-col px-4 py-1 sm:px-5 sm:py-2 md:px-6 md:py-3">
				<div className="flex items-center justify-between">
					<h3 className="text-base font-semibold sm:text-lg md:text-xl">
						{nightsCount} nights in Cabin {name}
					</h3>
					{isPast(new Date(dateStart)) ? (
						<span className="flex h-5 items-center rounded-sm bg-yellow-800 px-3 text-[0.55rem] font-bold uppercase text-yellow-200 sm:h-6 sm:text-[0.65rem] md:h-7 md:text-xs">
							past
						</span>
					) : (
						<span className="flex h-5 items-center rounded-sm bg-green-800 px-3 text-[0.55rem] font-bold uppercase text-green-200 sm:h-6 sm:text-[0.65rem] md:h-7 md:text-xs">
							upcoming
						</span>
					)}
				</div>

				<p className="text-primary-300">
					{format(dateStart, "EEE, MMM dd yyyy")} (
					{isToday(dateStart)
						? "Today"
						: formatDateFromNow(dateStartString)}
					) &mdash; {format(dateEnd, "EEE, MMM dd yyyy")}
				</p>

				<div className="mt-auto flex items-baseline gap-2 sm:gap-3 md:gap-4">
					<p className="text-base font-semibold text-accent-400 sm:text-lg md:text-xl">
						${priceTotal}
					</p>
					<p className="text-primary-300">&bull;</p>
					<p className="text-primary-300">
						{guestsCount} guest{guestsCount > 1 && "s"}
					</p>
					<p className="ml-auto text-xs text-primary-400 md:text-sm">
						Booked {format(createdAt, "EEE, MMM dd yyyy, p")}
					</p>
				</div>
			</div>

			<div className="flex h-10 items-center justify-between border-t border-primary-800 md:h-0 md:w-[100px] md:flex-col md:justify-normal md:border-l md:border-t-0">
				<a
					href={`/account/reservations/edit/${id}`}
					className="group flex flex-grow items-center justify-center gap-2 border-r border-primary-800 py-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900 md:items-start md:border-b md:border-r-0"
				>
					<PencilSquareIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
					<span className="mt-1">Edit</span>
				</a>
				<DeleteBooking id={id} />
			</div>
		</div>
	);
};
