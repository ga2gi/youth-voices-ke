// src/routes/admin/submissions/+page.server.js
import { supabase } from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Fetch all submissions, joining with the challenges table for context
    const { data: submissions, error: subError } = await supabase
        .from('submissions')
        .select(`
            id, 
            solution_text, 
            optional_contact,
            is_shortlisted,
            created_at,
            challenge:challenge_id (
                title
            )
        `)
        .order('created_at', { ascending: false }); // Show newest submissions first

    if (subError) {
        console.error('Admin Submissions Load Error:', subError);
        // Note: Returning fail(500) here would block the page. Returning a structured object is safer for load.
        return { submissions: [] };
    }

    // Flatten the data structure for easier use in the Svelte component
    const formattedSubmissions = submissions.map(sub => ({
        id: sub.id,
        solution_text: sub.solution_text,
        optional_contact: sub.optional_contact,
        is_shortlisted: sub.is_shortlisted,
        created_at: sub.created_at,
        challenge_title: sub.challenge.title,
    }));

    return { submissions: formattedSubmissions };
}

/** @type {import('./$types').Actions} */
export const actions = {
    /**
     * Toggles the 'is_shortlisted' status for a specific submission.
     */
    toggle_shortlist: async ({ request }) => {
        const formData = await request.formData();
        
        const id = formData.get('id');
        // Convert the string form value ('true' or 'false') to a boolean
        const current_status = formData.get('current_status') === 'true'; 
        
        if (!id) {
            return fail(400, { error: 'Invalid submission ID.' });
        }

        // --- Supabase Update ---
        const { error: updateError } = await supabase
            .from('submissions')
            .update({
                is_shortlisted: !current_status // Toggle the status
            })
            .eq('id', id);

        if (updateError) {
            console.error('Supabase Shortlist Toggle Error:', updateError);
            return fail(500, {
                id, 
                error: 'A server error occurred while updating the shortlist status.'
            });
        }
        
        // Return success object (used by enhance for UI feedback)
        return { success: true, updatedId: id };
    }
};