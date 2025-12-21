import { supabase } from '$lib/supabaseClient'; 
import { fail } from '@sveltejs/kit';

/**
 * Loads the challenges for the frontend UI
 * We include { depends } to allow for data invalidation
 */
export async function load({ depends }) {
    // This tag is used to refresh data across the app (like the homepage counter)
    depends('app:submissions');

    const { data: challenges, error } = await supabase
        .from('challenges')
        .select('id, title, pdf_url'); 

    if (error) {
        console.error('Fetch Error:', error);
        throw new Error('Failed to load challenges.');
    }
    
    return {
        challenges: challenges ?? []
    };
}

/**
 * Uses a Database RPC to handle the submission logic
 */
export const actions = {
    submit: async ({ request }) => {
        const formData = await request.formData();

        // Generate the ID that will link both tables
        const sharedSubmissionId = crypto.randomUUID();

        // Extract and process form data
        const challenge_title = formData.get('challenge_title');
        const solution_text = formData.get('solution_text');
        const implementation_timeline = formData.get('implementation_timeline');
        const supporting_evidence = formData.get('supporting_evidence') || null; 
        const optional_contact = formData.get('optional_contact') || null; 
        
        const stakeholder_dropdown = formData.get('responsible_stakeholder');
        const other_stakeholder_text = formData.get('other_stakeholder');

        const responsible_stakeholder = stakeholder_dropdown === 'Other' 
            ? other_stakeholder_text?.toString().trim() 
            : stakeholder_dropdown;

        // --- Validation ---
        if (!challenge_title || !solution_text || !responsible_stakeholder || !implementation_timeline) {
            return fail(400, { success: false, message: 'Required fields are missing.' });
        }

        if (solution_text.toString().length < 50) {
            return fail(400, { success: false, message: 'Solution must be at least 50 characters.' });
        }

        // Checkbox validation (Must match the 'name' attribute in Svelte file)
        if (!formData.has('declaration')) {
            return fail(400, { success: false, message: 'You must agree to the terms.' });
        }

        // --- CALL THE DATABASE FUNCTION (RPC) ---
        // This handles the insert into both the solutions and submissions table atomically
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
            console.error('RPC Submission Error:', rpcError);
            return fail(500, { 
                success: false, 
                message: `Submission failed: ${rpcError.message}.` 
            });
        }

        // Return success to the frontend
        return {
            success: true,
            message: 'Your solution and submission metadata have been successfully recorded.'
        };
    }
};