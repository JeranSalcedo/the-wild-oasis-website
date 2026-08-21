import { CabinData } from "@/features/cabins";
import { GuestData } from "@/features/guests";
import { Database } from "@/lib/supabase/database.types";

export type BookingData = Database["public"]["Tables"]["bookings"]["Row"];

export type BookingInsertData =
	Database["public"]["Tables"]["bookings"]["Insert"];

export type BookingUpdateData =
	Database["public"]["Tables"]["bookings"]["Update"];

export type BookingWithCabinAndGuestData = BookingData & {
	cabins: CabinData;
	guests: GuestData;
};

export type BookingWithCabinData = BookingData & {
	cabins: CabinData | null;
};
