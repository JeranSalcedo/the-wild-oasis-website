import { supabase } from "@/lib/supabase/client";

import type { Settings } from "../types/settings.types";

import { mapSettings } from "./settings.mapper";

export const getSettings = async (): Promise<Settings> => {
	const { data, error } = await supabase
		.from("settings")
		.select(
			"id, created_at, booking_length_min, booking_length_max, booking_guests_max, price_breakfast",
		)
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return mapSettings(data);
};
