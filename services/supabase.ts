import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bdastqdfkvyrgatbkwuk.supabase.co";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkYXN0cWRma3Z5cmdhdGJrd3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzODU2MzEsImV4cCI6MjA5Mzk2MTYzMX0.p6DQKKHfa0CsLpvqXeJJq0-NNH7njqjPe1vkD7nTvho";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
