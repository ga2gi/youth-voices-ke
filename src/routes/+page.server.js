import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load({ depends }) {
    // This creates a "tag" that we can trigger to refresh this specific data
    depends('app:submissions');

    // 1. Fetch Featured Challenge
    const { data: featuredChallenge } = await supabase
        .from('challenges')
        .select('id, title, overview_text, pdf_url')
        .eq('month_highlighted', true)
        .maybeSingle();

    // 2. Fetch Live Counts from the 'solutions' and 'policybriefs' tables
    const [totalSols, totalBriefs, implementedBriefs] = await Promise.all([
        supabase.from('solutions').select('*', { count: 'exact', head: true }),
        supabase.from('policybriefs').select('*', { count: 'exact', head: true }),
        supabase.from('policybriefs').select('*', { count: 'exact', head: true }).eq('status', 'Implemented')
    ]);

    return {
        featuredChallenge,
        metrics: {
            totalSubmissions: totalSols.count || 0,
            totalBriefs: totalBriefs.count || 0,
            implementedBriefs: implementedBriefs.count || 0,
        }
    };
}