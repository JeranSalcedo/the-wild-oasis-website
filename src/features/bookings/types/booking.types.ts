import type { CabinType } from "@/features/cabins";
import type { Guest } from "@/features/guests";

export type Booking = {
	id: number;
	createdAt: string;
	status: string;
	dateStart: string;
	dateEnd: string;
	nightsCount: number;
	guestsCount: number;
	priceCabin: number;
	priceExtras: number;
	priceTotal: number;
	breakfastIncluded: boolean;
	paid: boolean;
	observations: string;
	cabinId: number;
	guestId: number;
};

export type BookingWithCabinAndGuest = Booking & {
	cabin: CabinType;
	guest: Guest;
};

export type BookingWithCabin = Booking & {
	cabin: CabinType;
};
