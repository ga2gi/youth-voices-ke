// src/routes/opportunities/+page.server.js
import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const { data: opportunities, error } = await supabase
        .from('opportunities')
        .select('*')
        // Ensure only active/open opportunities are fetched (assuming you have an 'is_open' column)
        // .eq('is_open', true) 
        // Order by application deadline, showing nearest deadlines first
        .order('application_deadline', { ascending: true }); 

    if (error) {
        console.error('Opportunities Load Error:', error);
        return { groupedOpportunities: {} }; // Return empty object on error
    }

    // Group the opportunities by the 'category' column
    const groupedOpportunities = opportunities.reduce((groups, item) => {
        const category = item.category || 'Other';
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(item);
        return groups;
    }, {});

    return { 
        groupedOpportunities: groupedOpportunities
    };
}