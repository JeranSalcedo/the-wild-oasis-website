import { Database } from "@/lib/supabase/database.types";

export type GuestData = Database["public"]["Tables"]["guests"]["Row"];

export type GuestInsertData = Database["public"]["Tables"]["guests"]["Insert"];

export type GuestUpdateData = Database["public"]["Tables"]["guests"]["Update"];
