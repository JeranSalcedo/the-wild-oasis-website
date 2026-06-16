import type { Cabin } from "../types/cabin.types";

import { getCabins } from "../api/cabins.api";

import { CabinCard } from "./CabinCard";

export const CabinList = async () => {
	const cabins: Cabin[] = await getCabins();

	if (!cabins.length) return null;

	return (
		<div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
			{cabins.map((cabin) => (
				<CabinCard key={cabin.id} cabin={cabin} />
			))}
		</div>
	);
};
