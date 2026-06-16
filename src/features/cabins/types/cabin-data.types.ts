import { Database } from "@/lib/supabase/database.types";

export type CabinData = Database["public"]["Tables"]["cabins"]["Row"];
