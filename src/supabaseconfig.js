import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yszwlktldjrohxuneyop.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzendsa3RsZGpyb2h4dW5leW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMDYwMzAsImV4cCI6MjAyNDY4MjAzMH0.buZnIyrbhAzbrcFLst_GvbB_Vu_ta50Uc7h3DEJYL7A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
