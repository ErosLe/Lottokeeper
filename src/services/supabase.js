import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mriyslucdwgodvjtuflz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yaXlzbHVjZHdnb2R2anR1Zmx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2NTEyMDUsImV4cCI6MjAxNjIyNzIwNX0.fWnBS5-kcoHd4PWWn8V0COd24Pe4oZMvbbgmsFqZmog";

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
