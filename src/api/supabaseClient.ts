import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nqsdlgmhjxtqofwaliah.supabase.co";
const supabaseAnonKey = "sb_publishable_Y4WQu5T3YWn0qRlKGd0kJQ_FNxn-fvA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
