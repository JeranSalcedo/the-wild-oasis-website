"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CABIN_FILTER_FIELD, CABIN_FILTERS } from "../constants/cabin-filters";
import type { CabinFilterType } from "../constants/cabin-filters";

export const CabinFilter = () => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const activeFilter =
		searchParams.get(CABIN_FILTER_FIELD) ?? Object.keys(CABIN_FILTERS)[0];

	const handleFilter = (filter: CabinFilterType) => {
		const params = new URLSearchParams(searchParams.toString());

		if (filter && filter !== activeFilter) {
			params.set(CABIN_FILTER_FIELD, filter);
		} else {
			params.delete(CABIN_FILTER_FIELD);
		}

		replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<div className="flex border border-primary-800">
			{(
				Object.entries(CABIN_FILTERS) as [
					CabinFilterType,
					(typeof CABIN_FILTERS)[keyof typeof CABIN_FILTERS],
				][]
			)
				.filter(([key]) => key !== "all")
				.map(([key, value]) => (
					<button
						key={key}
						className={`${key === activeFilter && "bg-primary-700 text-primary-50"} px-4 py-2 text-xs hover:bg-primary-700 sm:text-sm md:text-base`}
						onClick={() => handleFilter(key)}
					>
						{value.label}
					</button>
				))}
		</div>
	);
};
