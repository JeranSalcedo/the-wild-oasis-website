import type { Guest } from "../types/guest.types";
import type { GuestData } from "../types/guest-data.types";

export const mapGuest = (guest: GuestData): Guest => ({
	id: guest.id,
	createdAt: guest.created_at,
	name: guest.full_name ?? "",
	email: guest.email ?? "",
	nationalId: guest.national_id ?? "",
	nationality: guest.nationality ?? "",
	countryFlag: guest.country_flag ?? "",
});
