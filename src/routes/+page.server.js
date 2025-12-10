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
        .eq('month_highlighted', true) // <-- Reverting to original filter
        .limit(1)
        .single();
        
    // Suppress the error if no rows are found (PGRST116)
    if (challengeError && challengeError.code !== 'PGRST116') {
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

    // 3. Format the challenge data
    const formattedChallenge = featuredChallenge ? {
        ...featuredChallenge,
        // Extract count from the nested PostgREST response
        submission_count: featuredChallenge.submissions[0]?.count || 0
    } : null;

    return {
        featuredChallenge: formattedChallenge, // Single featured challenge
        metrics: {
            totalSubmissions: totalSubmissions || 0,
            totalBriefs: totalBriefs || 0,
            implementedBriefs: implementedBriefs || 0,
        }
    };
}