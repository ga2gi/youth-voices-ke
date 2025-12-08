// src/routes/vote/+page.server.js
import { supabase } from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Fetch all submissions, joining with challenges to get the title.
    const { data: submissionsData, error: loadError } = await supabase
        .from('submissions')
        .select(`
            id, 
            solution_text, 
            challenge:challenge_id (title)
        `);

    if (loadError) {
        console.error('Error fetching submissions for voting:', loadError);
        return { submissions: [] };
    }
    
    const formattedSubmissions = submissionsData.map(sub => ({
        id: sub.id,
        solution_text: sub.solution_text,
        challenge_title: sub.challenge.title,
    }));

    return { submissions: formattedSubmissions };
}

/** @type {import('./$types').Actions} */
export const actions = {
    // Action to handle a vote submission
    vote: async ({ request }) => {
        const formData = await request.formData();
        
        const submission_id = formData.get('submission_id');
        
        // NOTE: Since the submission page was 'No login required', 
        // we use a simple placeholder 'voter_id'. In a real app, 
        // this must be a unique, secure ID (e.g., from a session or a cookie).
        const voter_id = 'public_voter_temp'; 

        if (!submission_id) {
            return fail(400, { error: 'Invalid submission selected.' });
        }
        
        // Insert a new vote record
        // We assume a simple upvote for the MVP (is_upvote: true)
        const { error: insertError } = await supabase
            .from('votes')
            .insert({
                submission_id: submission_id,
                voter_id: voter_id, 
                is_upvote: true
            });

        if (insertError) {
            console.error('Supabase Vote Insertion Error:', insertError);
            
            // A common error here will be a violation of a UNIQUE constraint 
            // (e.g., preventing a user from voting twice on the same solution).
            return fail(500, { 
                error: 'Could not record vote. You may have already voted on this solution or a server error occurred.' 
            });
        }
        
        // Return a success object. SvelteKit handles the UI update without redirecting.
        return { success: true, voted_id: submission_id };
    }
};