import { cache } from "react";

import { supabase } from "@/lib/supabase/client";

import { mapCabin } from "./cabins.mapper";

import { Cabin } from "../types/cabin.types";
import { CabinData } from "../types/cabin-data.types";

export const getCabin = cache(async (id: number): Promise<Cabin | null> => {
	const { data, error } = await supabase
		.from("cabins")
		.select(
			"name, description, image_url, max_capacity, base_price, discount",
		)
		.eq("id", id)
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return mapCabin(data as CabinData);
});

export const getCabins = async (): Promise<Cabin[]> => {
	const { data, error } = await supabase
		.from("cabins")
		.select("id, name, image_url, max_capacity, base_price, discount");

	if (error) {
		throw new Error(error.message);
	}

	return (data as CabinData[]).map(mapCabin);
};
