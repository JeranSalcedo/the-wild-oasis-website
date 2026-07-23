import { DayButton, DayButtonProps } from "@daypicker/react";

import { cn } from "@/utils/utils";

const invalidClasses = {
	start: "rounded-l-full border-r-0",
	middle: "border-x-0",
	end: "rounded-r-full border-l-0",
	single: "rounded-full",
};

export const CustomDayButton = ({
	day,
	modifiers,
	children,
	className,
	...buttonProps
}: DayButtonProps) => {
	const isSelected = modifiers.selected;
	const isBooked = modifiers.bookedDates;
	const invalidPosition = modifiers.invalidSingle
		? "single"
		: modifiers.invalidStart
			? "start"
			: modifiers.invalidEnd
				? "end"
				: modifiers.invalidMiddle
					? "middle"
					: null;

	return (
		<div className={!isSelected && isBooked ? "bg-accent-900" : ""}>
			<DayButton
				className={`relative inline-flex items-center justify-center overflow-visible ${className || ""}`}
				{...buttonProps}
				day={day}
				modifiers={modifiers}
			>
				{children}
				{invalidPosition && (
					<div
						className={cn(
							"pointer-events-none absolute inset-0 z-10 bg-red-700/25",
							invalidPosition && invalidClasses[invalidPosition],
						)}
					/>
				)}
			</DayButton>
		</div>
	);
};
