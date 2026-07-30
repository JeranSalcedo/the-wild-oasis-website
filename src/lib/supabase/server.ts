import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl) throw new Error("SUPABASE_URL is not defined");
if (!supabaseKey) throw new Error("SUPABASE_SECRET_KEY is not defined");

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
