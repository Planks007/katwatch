import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://grzegrynahprcuyfppas.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRhOGYzMjM2LWQ4MjEtNDIxMy1hOGE4LTQ1MWE2NDUxM2RlYSJ9.eyJwcm9qZWN0SWQiOiJncnplZ3J5bmFocHJjdXlmcHBhcyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzYzMDIwNDIzLCJleHAiOjIwNzgzODA0MjMsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.BipBhxrcleWyexP-xpwtHNggBHfGw71vhPOMxX2ip6g';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };