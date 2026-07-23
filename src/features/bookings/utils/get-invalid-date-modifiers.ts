import { areIntervalsOverlapping, eachDayOfInterval, max, min } from "date-fns";

import type { DateRange } from "@daypicker/react";

type DayRange = {
	from: Date;
	to: Date;
};

type InvalidDateModifiers = {
	invalidStart: Date[];
	invalidMiddle: Date[];
	invalidEnd: Date[];
	invalidSingle: Date[];
};

export const getInvalidDateModifiers = (
	range: DateRange | undefined,
	bookedRanges: DayRange[],
): InvalidDateModifiers => {
	const invalidModifiers: InvalidDateModifiers = {
		invalidStart: [],
		invalidMiddle: [],
		invalidEnd: [],
		invalidSingle: [],
	};

	if (!range?.from || !range?.to) return invalidModifiers;

	const selectedInterval = { start: range.from, end: range.to };

	for (const booked of bookedRanges) {
		const bookedInterval = { start: booked.from, end: booked.to };

		if (
			!areIntervalsOverlapping(selectedInterval, bookedInterval, {
				inclusive: true,
			})
		)
			continue;

		const overlap = {
			start: max([selectedInterval.start, bookedInterval.start]),
			end: min([selectedInterval.end, bookedInterval.end]),
		};

		const days = eachDayOfInterval(overlap);
		const first = days[0];
		const last = days.at(-1)!;

		if (days.length === 1) {
			invalidModifiers.invalidSingle.push(first);
			continue;
		}

		invalidModifiers.invalidStart.push(first);
		invalidModifiers.invalidEnd.push(last);

		invalidModifiers.invalidMiddle.push(...days.slice(1, -1));
	}

	return invalidModifiers;
};
