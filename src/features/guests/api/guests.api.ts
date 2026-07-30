import { supabase } from "@/lib/supabase/server";

import type { Guest } from "../types/guest.types";
import type { GuestData, GuestInsertData } from "../types/guest-data.types";

import { mapGuest } from "./guests.mapper";

export const getGuest = async (email: string): Promise<Guest | null> => {
	const { data } = await supabase
		.from("guests")
		.select(
			"id, created_at, full_name, email, national_id, nationality, country_flag",
		)
		.eq("email", email)
		.single();

	return data ? mapGuest(data as GuestData) : null;
};

export const createGuest = async (guest: GuestInsertData) => {
	const { data, error } = await supabase
		.from("guests")
		.insert(guest)
		.select()
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return mapGuest(data as GuestData);
};
