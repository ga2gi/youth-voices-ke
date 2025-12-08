import { supabaseAdmin } from '$lib/supabase/server.js';

export async function load() {
  try {
    // Get all published policy briefs
    const { data: policyBriefs, error } = await supabaseAdmin
      .from('policy_briefs')
      .select(`
        *,
        challenges (
          title,
          id
        )
      `)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching policy briefs:', error);
      return { policyBriefs: [] };
    }

    // Categorize briefs
    const featuredBriefs = policyBriefs?.filter(brief => brief.featured) || [];
    const recentBriefs = policyBriefs?.slice(0, 6) || []; // Latest 6
    const allBriefs = policyBriefs || [];

    return {
      policyBriefs: allBriefs,
      featuredBriefs,
      recentBriefs,
      totalCount: allBriefs.length
    };

  } catch (error) {
    console.error('Error in policy briefs page:', error);
    return { policyBriefs: [], featuredBriefs: [], recentBriefs: [], totalCount: 0 };
  }
}