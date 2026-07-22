import type { Cabin } from "../types/cabin.types";

export const CABIN_FILTER_FIELD = "capacity";

export const CABIN_FILTERS = {
	all: {
		label: "All cabins",
		predicate: () => true,
	},
	small: {
		label: "1-3 guests",
		predicate: (cabin: Cabin) => cabin.maxCapacity <= 3,
	},
	medium: {
		label: "4-7 guests",
		predicate: (cabin: Cabin) =>
			cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
	},
	large: {
		label: "8+ guests",
		predicate: (cabin: Cabin) => cabin.maxCapacity >= 8,
	},
} as const;

export type CabinFilterType = keyof typeof CABIN_FILTERS;
