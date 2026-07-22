"use client";

import { useReservation } from "../contexts/ReservationContext";

import { Button } from "@/components/Button";

type ReservationFormProps = {
	maxCapacity: number;
};

export const ReservationForm = ({ maxCapacity }: ReservationFormProps) => {
	const { rangeSelected } = useReservation();

	return (
		<div className="flex-1">
			<div className="flex flex-col items-center justify-between gap-2.5 bg-primary-800 px-12 py-3 text-primary-300 sm:flex-row md:flex-col lg:flex-row">
				<p className="text-sm sm:text-base md:text-sm lg:text-base">
					Logged in as %NAME%
				</p>

				<div className="flex items-center gap-4">
					<div>IMG</div>
					<p className="text-sm sm:text-base md:text-sm lg:text-base">
						%NAME%
					</p>
				</div>
			</div>

			<form className="flex flex-col gap-5 bg-primary-900 px-8 py-6 sm:px-12 sm:py-8 md:px-8 md:py-6 lg:px-12 lg:py-8">
				<div className="space-y-2">
					<label
						htmlFor="guestsCount"
						className="text-sm sm:text-base md:text-sm lg:text-base"
					>
						How many guests?
					</label>
					<select
						id="guestsCount"
						name="guestsCount"
						className="w-full rounded-sm bg-primary-200 px-3 py-2 text-sm text-primary-800 shadow-sm sm:px-4 sm:py-2.5 sm:text-base md:px-3 md:py-2 md:text-sm lg:px-4 lg:py-2.5 lg:text-base"
						required
					>
						<option key="" value="">
							Select number of guests...
						</option>
						{Array.from(
							{ length: maxCapacity },
							(_, i) => i + 1,
						).map((x) => (
							<option key={x} value={x}>
								{x} {x === 1 ? "guest" : "guests"}
							</option>
						))}
					</select>
				</div>

				<div className="space-y-2">
					<label
						htmlFor="observations"
						className="text-sm sm:text-base md:text-sm lg:text-base"
					>
						Anything we should know about your stay?
					</label>
					<textarea
						id="observations"
						name="observations"
						className="w-full rounded-sm bg-primary-200 px-3 py-2 text-sm text-primary-800 shadow-sm sm:px-4 sm:py-2.5 sm:text-base md:px-3 md:py-2 md:text-sm lg:px-4 lg:py-2.5 lg:text-base"
						placeholder="Any pets, allergies, special requirements, etc.?"
					/>
				</div>

				<div className="flex flex-col items-center justify-end gap-x-6 gap-y-2 sm:flex-row">
					{!rangeSelected && (
						<p className="text-base text-primary-300">
							Start by selecting dates
						</p>
					)}
					<Button className="text-sm sm:text-base md:px-4 md:py-3 md:text-sm md:focus:outline-1 md:focus:outline-offset-1 lg:px-5 lg:py-4 lg:text-base lg:focus:outline-2 lg:focus:outline-offset-2">
						Reserve now
					</Button>
				</div>
			</form>
		</div>
	);
};
