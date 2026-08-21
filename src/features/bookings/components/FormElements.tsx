"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/Button";

type FormElementsProps = {
	guestsCount: number;
	observations: string;
	maxCapacity: number;
};

export const FormElements = ({
	guestsCount,
	observations,
	maxCapacity,
}: FormElementsProps) => {
	const { pending } = useFormStatus();

	return (
		<>
			<div className="space-y-1">
				<label htmlFor="guestsCount">How many guests?</label>
				<select
					name="guestsCount"
					id="guestsCount"
					className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
					defaultValue={guestsCount}
					disabled={pending}
					required
				>
					<option value="" key="">
						Select number of guests...
					</option>
					{Array.from({ length: maxCapacity }, (_, i) => i + 1).map(
						(x) => (
							<option value={x} key={x}>
								{x} {x === 1 ? "guest" : "guests"}
							</option>
						),
					)}
				</select>
			</div>

			<div className="space-y-1">
				<label htmlFor="observations">
					Anything we should know about your stay?
				</label>
				<textarea
					name="observations"
					className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
					defaultValue={observations}
					disabled={pending}
				/>
			</div>

			<div className="flex items-center justify-end gap-6">
				{pending && <div className="spinner-mini" />}
				<Button disabled={pending}>Updating reservation</Button>
			</div>
		</>
	);
};
