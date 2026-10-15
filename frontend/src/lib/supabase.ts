import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables!\n" +
      "Please make sure REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY are defined in frontend/.env\n" +
      "NOTE: Create React App requires restarting the dev server (`npm start`) to pick up new or changed .env variables."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);
