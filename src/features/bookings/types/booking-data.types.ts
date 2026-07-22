import { CabinData } from "@/features/cabins";
import { GuestData } from "@/features/guests";
import { Database } from "@/lib/supabase/database.types";

export type BookingData = Database["public"]["Tables"]["bookings"]["Row"];

export type BookingWithCabinAndGuestData = BookingData & {
	cabins: CabinData;
	guests: GuestData;
};
