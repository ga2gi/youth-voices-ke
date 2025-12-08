// src/routes/admin/+page.server.js
import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // --- 1. Total Counts ---
    const [
        { count: totalSubmissions, error: subError },
        { count: totalVotes, error: voteError },
        { count: totalBriefs, error: briefError },
        { count: totalChallenges, error: challengeError },
    ] = await Promise.all([
        supabase.from('submissions').select('*', { count: 'exact', head: true }),
        supabase.from('votes').select('*', { count: 'exact', head: true }),
        supabase.from('policybriefs').select('*', { count: 'exact', head: true }),
        supabase.from('challenges').select('*', { count: 'exact', head: true }),
    ]);

    // --- 2. Shortlist Count ---
    const { count: shortlistedSubmissions, error: shortlistedError } = await supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true })
        .eq('is_shortlisted', true);

    // --- 3. Implemented Briefs Count ---
    const { count: implementedBriefs, error: implementedError } = await supabase
        .from('policybriefs')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Implemented');

    return {
        metrics: {
            totalSubmissions: totalSubmissions || 0,
            shortlistedSubmissions: shortlistedSubmissions || 0,
            totalVotes: totalVotes || 0,
            totalBriefs: totalBriefs || 0,
            implementedBriefs: implementedBriefs || 0,
            totalChallenges: totalChallenges || 0,
        },
        errors: { subError, voteError, briefError, challengeError, shortlistedError, implementedError }
    };
}