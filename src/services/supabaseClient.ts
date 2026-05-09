import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cuunznkgdfexzhhwsntr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1dW56bmtnZGZleHpoaHdzbnRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MTQyMDgsImV4cCI6MjA4OTM5MDIwOH0.wkJDowoe3NVkrb-cMrna7Ah431PH-F317DnnrhOYnpk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
