"use client";

import { Button } from "@/components/Button";
import { useFormStatus } from "react-dom";

type ReservationFormElementsProps = {
	maxCapacity: number;
	rangeSelected: boolean;
	disabled: boolean;
};

export const ReservationFormElements = ({
	maxCapacity,
	rangeSelected,
	disabled,
}: ReservationFormElementsProps) => {
	const { pending } = useFormStatus();

	return (
		<>
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
					className="w-full rounded-sm bg-primary-200 px-3 py-2 text-sm text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 sm:px-4 sm:py-2.5 sm:text-base md:px-3 md:py-2 md:text-sm lg:px-4 lg:py-2.5 lg:text-base"
					required
					disabled={pending}
				>
					<option key="" value="">
						Select number of guests...
					</option>
					{Array.from({ length: maxCapacity }, (_, i) => i + 1).map(
						(x) => (
							<option key={x} value={x}>
								{x} {x === 1 ? "guest" : "guests"}
							</option>
						),
					)}
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
					className="w-full rounded-sm bg-primary-200 px-3 py-2 text-sm text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 sm:px-4 sm:py-2.5 sm:text-base md:px-3 md:py-2 md:text-sm lg:px-4 lg:py-2.5 lg:text-base"
					placeholder="Any pets, allergies, special requirements, etc.?"
					disabled={pending}
				/>
			</div>

			<div className="flex flex-col items-center justify-end gap-x-6 gap-y-2 sm:flex-row">
				{pending ? (
					<div className="spinner-mini" />
				) : (
					!rangeSelected && (
						<p className="text-base text-primary-300">
							Start by selecting dates
						</p>
					)
				)}
				<Button
					className="text-sm sm:text-base md:px-4 md:py-3 md:text-sm md:focus:outline-1 md:focus:outline-offset-1 lg:px-5 lg:py-4 lg:text-base lg:focus:outline-2 lg:focus:outline-offset-2"
					disabled={pending || disabled}
				>
					Reserve now
				</Button>
			</div>
		</>
	);
};
