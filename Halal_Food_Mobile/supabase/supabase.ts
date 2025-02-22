import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://gqpsxfmxhwutpglqgxzz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxcHN4Zm14aHd1dHBnbHFneHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQxMTgxMTQsImV4cCI6MjAxOTY5NDExNH0.Fm5Pm8embNx2OEkb1JFYV3OXUKZwdhgY0VOJR_YxONo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);