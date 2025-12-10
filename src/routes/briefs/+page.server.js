// src/routes/briefs/+page.server.js
import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // --- DIAGNOSTIC QUERY: Fetching ONLY policy briefs without any joins or grouping ---
    const { data: briefsData, error: briefsError } = await supabase
        .from('policybriefs')
        .select(`
            id, 
            title, 
            description, 
            delivery_date, 
            status, 
            stakeholder_acknowledged, 
            pdf_url 
        `) // Fetching only essential columns
        .order('delivery_date', { ascending: false });

    if (briefsError) {
        console.error('CRITICAL ERROR: Policy Briefs Query Failed:', briefsError);
        // If this query fails, the problem is RLS on the policybriefs table.
        return { groupedBriefs: [] };
    }
    
    // If successful, we wrap each brief in a dummy group so the Svelte component can render them
    const dummyGroup = {
        // Show a clean, user-facing title in the UI
        title: "ALL BRIEFS",
        id: "diagnostic",
        briefs: briefsData
    };

    // If data is fetched, it will be wrapped in a single group.
    return { 
        groupedBriefs: [dummyGroup]
    };
}