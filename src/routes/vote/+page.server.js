// src/routes/vote/+page.server.js
import { supabase } from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // 1. Fetch all submissions that are shortlisted and join with Challenges for the title
    // 2. Also, COUNT the total votes for each submission
    const { data: submissionsData, error: loadError } = await supabase
        .from('Submissions') // Use 'Submissions' with capital S as per your new table definition
        .select(`
            id, 
            solution_text,
            is_shortlisted,
            challenge:challenge_id (title),
            vote_count:votes(count)
        `)
        .eq('is_shortlisted', true); // Only fetch submissions ready for voting

    if (loadError) {
        console.error('Error fetching submissions for voting:', loadError);
        return { submissions: [] };
    }
    
    const formattedSubmissions = submissionsData.map(sub => ({
        id: sub.id,
        solution_text: sub.solution_text,
        challenge_title: sub.challenge.title,
        // The vote_count array returns [{ count: N }], so we extract N
        vote_count: sub.vote_count[0]?.count || 0,
    }));

    return { submissions: formattedSubmissions };
}

/** @type {import('./$types').Actions} */
export const actions = {
    // Action to handle a vote submission
    vote: async ({ request }) => {
        const formData = await request.formData();
        
        const submission_id = formData.get('submission_id');
        
        // SECURE VOTER ID: This is a critical point. For local testing, 
        // we use a simple placeholder. In a production environment, 
        // you MUST use a secure, unique identifier (e.g., from a session or Supabase Auth).
        const voter_id = 'public_voter_temp'; // Placeholder

        if (!submission_id) {
            return fail(400, { error: 'Invalid submission selected.' });
        }
        
        // Insert a new vote record
        const { error: insertError } = await supabase
            .from('votes')
            .insert({
                submission_id: submission_id,
                voter_id: voter_id, 
                is_upvote: true
            });

        if (insertError) {
            console.error('Supabase Vote Insertion Error:', insertError);
            
            // Check for unique constraint violation (code '23505' for PostgreSQL)
            if (insertError.code === '23505') {
                 return fail(409, { // 409 Conflict status code
                    error: 'You have already voted on this solution.',
                    voted_id: submission_id
                });
            }
            
            return fail(500, { 
                error: 'Could not record vote due to a server error.' 
            });
        }
        
        // Return a success object.
        return { success: true, voted_id: submission_id };
    }
};