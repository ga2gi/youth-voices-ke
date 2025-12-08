// src/routes/+page.server.js
import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // 1. Fetch the currently highlighted challenge
    const { data: featuredChallenge, error: challengeError } = await supabase
        .from('challenges')
        .select(`
            id,
            title,
            overview_text,
            pdf_url,
            created_at,
            submissions (count)
        `)
        .eq('month_highlighted', true)
        .limit(1)
        .single();
        
    if (challengeError && challengeError.code !== 'PGRST116') { // PGRST116 = No rows found
        console.error('Homepage Featured Challenge Error:', challengeError);
    }
    
    // 2. Fetch platform metrics for the impact snapshot
    const [
        { count: totalSubmissions },
        { count: totalBriefs },
        { count: implementedBriefs },
    ] = await Promise.all([
        supabase.from('submissions').select('*', { count: 'exact', head: true }),
        supabase.from('policybriefs').select('*', { count: 'exact', head: true }),
        supabase.from('policybriefs').select('*', { count: 'exact', head: true }).eq('status', 'Implemented'),
    ]);

    const formattedChallenge = featuredChallenge ? {
        ...featuredChallenge,
        submission_count: featuredChallenge.submissions[0]?.count || 0
    } : null;

    return {
        featuredChallenge: formattedChallenge,
        metrics: {
            totalSubmissions: totalSubmissions || 0,
            totalBriefs: totalBriefs || 0,
            implementedBriefs: implementedBriefs || 0,
        }
    };
}