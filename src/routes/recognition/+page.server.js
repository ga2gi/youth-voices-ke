import { supabase } from "$lib/supabaseClient";

export const load = async () => {
    const { data: trackerEntries, error } = await supabase
        .from('accountability_tracker_view')
        .select('*')
        .order('days_since_dispatch', { ascending: false });

    if (error) {
        console.error("Error fetching accountability data:", error);
        return { trackerEntries: [] };
    }

    return { trackerEntries };
};