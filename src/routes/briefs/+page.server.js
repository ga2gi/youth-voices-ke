// src/routes/briefs/+page.server.js
import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Fetch all policy briefs, ordered by delivery date
    const { data: briefs, error: briefsError } = await supabase
        .from('policybriefs')
        .select('*')
        .order('delivery_date', { ascending: false });

    if (briefsError) {
        console.error('Public Policy Briefs Load Error:', briefsError);
        // Fail silently on the public page by returning an empty array
        return { briefs: [] };
    }

    return { 
        briefs: briefs || []
    };
}