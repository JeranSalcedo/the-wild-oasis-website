import { CABIN_FILTERS } from "../constants/cabin-filters";
import type { CabinFilterType } from "../constants/cabin-filters";

export const getCabinFilter = (value: string | undefined): CabinFilterType => {
	if (value && value in CABIN_FILTERS) {
		return value as CabinFilterType;
	}

	return "all";
};
