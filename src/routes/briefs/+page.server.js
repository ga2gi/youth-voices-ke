import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
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
        `)
        .order('delivery_date', { ascending: false });

    if (briefsError) {
        console.error('Database Connection Error:', briefsError);
        return { groupedBriefs: [] };
    }
    
    return { 
        groupedBriefs: [{
            title: "NATIONAL REGISTRY",
            briefs: briefsData || []
        }]
    };
}