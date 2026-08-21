import Image from "next/image";

import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, isPast, isToday } from "date-fns";

import { formatDateFromNow } from "@/utils/date.utils";

import type { BookingWithCabin } from "../types/booking.types";

import { DeleteBooking } from "./DeleteBooking";
import { LinkButton } from "@/components/LinkButton";

type BookingCardProps = {
	booking: BookingWithCabin;
	onDelete: (bookingId: number) => Promise<void>;
};

export const BookingCard = ({ booking, onDelete }: BookingCardProps) => {
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

	const disabled = isPast(dateStart);

	return (
		<div className="flex flex-col border border-primary-800 md:flex-row">
			<div className="relative aspect-[4/3] max-h-56 w-full md:aspect-auto md:w-56 md:flex-shrink-0 md:self-stretch">
				<Image
					src={imageUrl}
					alt={`Cabin ${name}`}
					fill
					className="object-cover"
				/>
			</div>

			<div className="flex w-full flex-col lg:flex-row">
				<div className="flex flex-grow flex-col px-4 py-1 sm:px-5 sm:py-2 md:px-6 md:py-3">
					<div className="flex items-center justify-between">
						<h3 className="text-base font-semibold sm:text-lg md:text-xl">
							{nightsCount} night{nightsCount !== 1 && "s"} in
							Cabin {name}
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

					<p className="text-primary-300 md:text-base lg:text-lg">
						{format(dateStart, "EEE, MMM dd yyyy")} (
						{isToday(dateStart)
							? "Today"
							: formatDateFromNow(dateStartString)}
						) &mdash; {format(dateEnd, "EEE, MMM dd yyyy")}
					</p>

					<div className="mt-auto flex items-baseline gap-2 sm:gap-3 md:flex-col md:gap-4">
						<div className="flex gap-1 sm:gap-2 md:gap-3">
							<p className="text-base font-semibold text-accent-400 sm:text-lg md:text-xl">
								${priceTotal}
							</p>
							<p className="text-primary-300">&bull;</p>
							<p className="text-primary-300">
								{guestsCount} guest{guestsCount > 1 && "s"}
							</p>
						</div>
						<p className="ml-auto text-xs text-primary-400 sm:ml-0 md:text-sm">
							Booked {format(createdAt, "EEE, MMM dd yyyy, p")}
						</p>
					</div>
				</div>

				<div className="flex h-10 items-center justify-between border-t border-primary-800 lg:h-full lg:w-[100px] lg:flex-col lg:border-l lg:border-t-0">
					<LinkButton
						href={`/account/reservations/edit/${id}`}
						className="group flex flex-grow items-center justify-center gap-2 border-r border-primary-800 py-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900 lg:w-full lg:border-b lg:border-r-0"
						disabled={disabled}
					>
						<PencilSquareIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
						<span className="mt-1">Edit</span>
					</LinkButton>
					<DeleteBooking
						id={id}
						onDelete={onDelete}
						disabled={disabled}
					/>
				</div>
			</div>
		</div>
	);
};
