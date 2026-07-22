import type { Settings } from "../types/settings.types";
import type { SettingsData } from "../types/settings-data.types";

export const mapSettings = (data: SettingsData): Settings => {
	const settings: Settings = {
		id: data.id,
		createdAt: data.created_at,
		bookingLengthMin: data.booking_length_min ?? 0,
		bookingLengthMax: data.booking_length_max ?? 0,
		bookingGuestsMax: data.booking_guests_max ?? 0,
		priceBreakfast: data.price_breakfast ?? 0,
	};

	return settings;
};
