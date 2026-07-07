import type { Cabin } from "../types/cabin.types";
import type { CabinData } from "../types/cabin-data.types";

export const mapCabin = (data: CabinData): Cabin => {
	const cabin: Cabin = {
		id: data.id,
		createdAt: data.created_at,
		name: data.name ?? "",
		description: data.description ?? "",
		imageUrl: data.image_url ?? "",
		maxCapacity: data.max_capacity ?? 0,
		basePrice: data.base_price ?? 0,
		discount: data.discount ?? 0,
	};

	return cabin;
};
