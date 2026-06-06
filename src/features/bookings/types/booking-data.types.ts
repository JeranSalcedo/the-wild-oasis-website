import { CabinData } from "@/features/cabins";
import { GuestData } from "@/features/guests";

export type BookingData = {
	id: number;
	created_at: string;
	status: string;
	date_start: string;
	date_end: string;
	nights_count: number;
	guests_count: number;
	price_cabin: number;
	price_extras: number;
	price_total: number;
	breakfast_included: boolean;
	paid: boolean;
	observations: string;
	cabin_id: number;
	guest_id: number;
};

export type BookingWithCabinAndGuestData = BookingData & {
	cabins: CabinData;
	guests: GuestData;
};
