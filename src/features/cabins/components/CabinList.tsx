import type { Cabin } from "../types/cabin.types";
import type { CabinFilterType } from "../constants/cabin-filters";

import { CABIN_FILTERS } from "../constants/cabin-filters";

import { getCabins } from "../api/cabins.api";

import { CabinCard } from "./CabinCard";

type CabinListProps = {
	filter: CabinFilterType;
};

export const CabinList = async ({ filter }: CabinListProps) => {
	const cabins: Cabin[] = await getCabins();

	if (!cabins.length) return null;

	const predicate = CABIN_FILTERS[filter].predicate;

	return (
		<div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
			{cabins.filter(predicate).map((cabin) => (
				<CabinCard key={cabin.id} cabin={cabin} />
			))}
		</div>
	);
};
