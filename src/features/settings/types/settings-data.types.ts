import { Database } from "@/lib/supabase/database.types";

export type SettingsData = Database["public"]["Tables"]["settings"]["Row"];
