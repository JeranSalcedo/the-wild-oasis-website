import type { Cabin } from "../types/cabin.types";
import type { CabinData } from "../types/cabin-data.types";

export const mapCabin = (data: CabinData): Cabin => {
	return {
		id: data.id,
		createdAt: data.created_at,
		name: data.name,
		description: data.description,
		imageUrl: data.image_url,
		maxCapacity: data.max_capacity,
		basePrice: data.base_price,
		discount: data.discount,
	};
};
