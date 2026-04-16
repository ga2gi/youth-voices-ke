import { supabase } from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';

export async function load({ depends }) {
    depends('app:submissions');
    // Fetch challenges - Ensure these exist in your Supabase 'challenges' table
    const { data: challenges, error } = await supabase
        .from('challenges')
        .select('id, title');

    if (error) throw new Error('Could not connect to Supabase.');
    return { challenges: challenges ?? [] };
}

export const actions = {
    submit: async ({ request }) => {
        const formData = await request.formData();
        const sharedSubmissionId = crypto.randomUUID();

        const challenge_title = formData.get('challenge_title');
        const solution_text = formData.get('solution_text');
        const implementation_timeline = formData.get('implementation_timeline');
        const supporting_evidence = formData.get('supporting_evidence') || null;
        const optional_contact = formData.get('optional_contact') || null;
        const responsible_stakeholder = formData.get('responsible_stakeholder');

        // Server-side validation
        if (!challenge_title || !solution_text || !responsible_stakeholder || !implementation_timeline) {
            return fail(400, { success: false, message: 'All required fields must be filled.' });
        }
        
        if (!formData.has('declaration')) {
            return fail(400, { success: false, message: 'Please accept the research terms.' });
        }

        // RPC call to your Supabase function
        const { error: rpcError } = await supabase.rpc('submit_policy_solution', {
            arg_id: sharedSubmissionId,
            arg_challenge_title: challenge_title,
            arg_solution_text: solution_text,
            arg_stakeholder: responsible_stakeholder,
            arg_timeline: implementation_timeline,
            arg_evidence: supporting_evidence,
            arg_contact: optional_contact
        });

        if (rpcError) {
            return fail(500, { success: false, message: `Database error: ${rpcError.message}` });
        }

        return { success: true, message: 'Solution transmitted. Thank you for co-creating Kenya\'s future.' };
    }
};