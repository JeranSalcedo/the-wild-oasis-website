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
		<div className="flex border border-primary-800">
			<div className="relative aspect-square h-32">
				<img
					src={imageUrl}
					alt={`Cabin ${name}`}
					className="border-r border-primary-800 object-cover"
				/>
			</div>

			<div className="flex flex-grow flex-col px-6 py-3">
				<div className="flex items-center justify-between">
					<h3 className="text-xl font-semibold">
						{nightsCount} nights in Cabin {name}
					</h3>
					{isPast(new Date(dateStart)) ? (
						<span className="flex h-7 items-center rounded-sm bg-yellow-800 px-3 text-xs font-bold uppercase text-yellow-200">
							past
						</span>
					) : (
						<span className="flex h-7 items-center rounded-sm bg-green-800 px-3 text-xs font-bold uppercase text-green-200">
							upcoming
						</span>
					)}
				</div>

				<p className="text-lg text-primary-300">
					{format(dateStart, "EEE, MMM dd yyyy")} (
					{isToday(dateStart)
						? "Today"
						: formatDateFromNow(dateStartString)}
					) &mdash; {format(dateEnd, "EEE, MMM dd yyyy")}
				</p>

				<div className="mt-auto flex items-baseline gap-5">
					<p className="text-xl font-semibold text-accent-400">
						${priceTotal}
					</p>
					<p className="text-primary-300">&bull;</p>
					<p className="text-lg text-primary-300">
						{guestsCount} guest{guestsCount > 1 && "s"}
					</p>
					<p className="ml-auto text-sm text-primary-400">
						Booked {format(createdAt, "EEE, MMM dd yyyy, p")}
					</p>
				</div>
			</div>

			<div className="flex w-[100px] flex-col border-l border-primary-800">
				<a
					href={`/account/reservations/edit/${id}`}
					className="group flex flex-grow items-center gap-2 border-b border-primary-800 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
				>
					<PencilSquareIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
					<span className="mt-1">Edit</span>
				</a>
				<DeleteBooking id={id} />
			</div>
		</div>
	);
};
