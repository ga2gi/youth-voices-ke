// src/routes/recognition/+page.server.js
import { supabase } from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Fetch all policy briefs, but only select the title and the acknowledged stakeholder
    const { data: briefs, error: briefsError } = await supabase
        .from('policybriefs')
        .select('title, stakeholder_acknowledged')
        .not('stakeholder_acknowledged', 'is', null); // Filter out entries with no acknowledgment

    if (briefsError) {
        console.error('Stakeholder Recognition Load Error:', briefsError);
        return fail(500, { message: 'Failed to load stakeholder data.' });
    }

    // Process data to group briefs by the acknowledging stakeholder
    const stakeholders = briefs.reduce((acc, brief) => {
        const name = brief.stakeholder_acknowledged;
        if (name) {
            if (!acc[name]) {
                acc[name] = { name, briefs: [] };
            }
            acc[name].briefs.push(brief.title);
        }
        return acc;
    }, {});

    return { stakeholders: Object.values(stakeholders) };
}