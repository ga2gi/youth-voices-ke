import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load({ depends }) {
    // Tag for potential cache invalidation
    depends('app:submissions');

    // 1. Fetch Featured Challenge (monthly highlight)
    const { data: featuredChallenge } = await supabase
        .from('challenges')
        .select('id, title, overview_text, pdf_url')
        .eq('month_highlighted', true)
        .eq('status', 'active')
        .maybeSingle();

    // 2. Fetch all active challenges for the co-creation hub
    const { data: challenges } = await supabase
        .from('challenges')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

    // 3. Fetch live counts
    const [totalSols, totalBriefs, implementedBriefs] = await Promise.all([
        supabase.from('solutions').select('*', { count: 'exact', head: true }),
        supabase.from('policybriefs').select('*', { count: 'exact', head: true }),
        supabase.from('policybriefs').select('*', { count: 'exact', head: true }).eq('status', 'Implemented')
    ]);

    // 4. Fetch tracker entries for accountability page
    const { data: trackerEntries } = await supabase
        .from('tracker_entries')
        .select('*')
        .order('days_since_dispatch', { ascending: false });

    // 5. Fetch recent submissions (latest 10)
    const { data: recentSubmissions } = await supabase
        .from('solutions')
        .select('id, challenge_title, solution_text, responsible_stakeholder, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

    return {
        featuredChallenge,
        challenges: challenges || [],
        trackerEntries: trackerEntries || [],
        recentSubmissions: recentSubmissions || [],
        metrics: {
            totalSubmissions: totalSols.count || 0,
            totalBriefs: totalBriefs.count || 0,
            implementedBriefs: implementedBriefs.count || 0,
        }
    };
}