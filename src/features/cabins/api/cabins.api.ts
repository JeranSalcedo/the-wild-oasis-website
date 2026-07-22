import { cache } from "react";

import { supabase } from "@/lib/supabase/client";

import type { Cabin } from "../types/cabin.types";
import type { CabinData } from "../types/cabin-data.types";

import { mapCabin } from "./cabins.mapper";

export const getCabin = cache(async (id: number): Promise<Cabin | null> => {
	const { data, error } = await supabase
		.from("cabins")
		.select(
			"id, created_at, name, description, image_url, max_capacity, base_price, discount",
		)
		.eq("id", id)
		.single();

	if (error) {
		if (error.code === "PGRST116") return null;

		throw new Error(error.message);
	}

	return mapCabin(data as CabinData);
});

export const getCabins = async (): Promise<Cabin[]> => {
	const { data, error } = await supabase
		.from("cabins")
		.select("id, name, image_url, max_capacity, base_price, discount")
		.order("name", { ascending: true });

	if (error) {
		throw new Error(error.message);
	}

	return (data as CabinData[]).map(mapCabin);
};
