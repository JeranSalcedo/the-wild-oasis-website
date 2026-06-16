import type { Guest } from "../types/guest.types";
import type { GuestData } from "../types/guest-data.types";

export const mapGuest = (data: GuestData): Guest => {
	return {
		id: data.id,
		createdAt: data.created_at,
		fullName: data.full_name,
		email: data.email,
		nationalId: data.national_id,
		nationality: data.nationality,
		countryFlag: data.country_flag,
	};
};
