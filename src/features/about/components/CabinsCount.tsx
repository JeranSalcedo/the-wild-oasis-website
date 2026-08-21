import { getCabins } from "@/features/cabins";

export const CabinsCount = async () => {
	const cabins = await getCabins();
	const cabinsCount = cabins?.length ?? 0;

	return <span className="font-bold">{cabinsCount}</span>;
};
