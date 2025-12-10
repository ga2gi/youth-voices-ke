// src/routes/vote/+page.server.js
import { supabase } from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // **FIXED:** Using lowercase 'submissions' to match your database
    const { data: submissionsData, error: loadError } = await supabase
        .from('submissions') 
        .select(`
            id, 
            solution_text,
            is_shortlisted,
            challenge:challenge_id (title),
            vote_count:votes(count) // votes is already lowercase
        `)
        .eq('is_shortlisted', true); 

    if (loadError) {
        console.error('Error fetching submissions for voting:', loadError);
        // The page will now correctly show the cards if there's data, or the empty state if not.
        return { submissions: [] };
    }
    
    const formattedSubmissions = submissionsData.map(sub => ({
        id: sub.id,
        solution_text: sub.solution_text,
        challenge_title: sub.challenge.title,
        vote_count: sub.vote_count[0]?.count || 0,
    }));

    return { submissions: formattedSubmissions };
}

/** @type {import('./$types').Actions} */
export const actions = {
    vote: async ({ request }) => {
        const formData = await request.formData();
        const submission_id = formData.get('submission_id');
        const voter_id = 'public_voter_temp'; // Placeholder

        if (!submission_id) {
            return fail(400, { error: 'Invalid submission selected.' });
        }
        
        // 'votes' is already correct and lowercase
        const { error: insertError } = await supabase
            .from('votes')
            .insert({
                submission_id: submission_id,
                voter_id: voter_id, 
                is_upvote: true
            });

        if (insertError) {
            console.error('Supabase Vote Insertion Error:', insertError);
            
            if (insertError.code === '23505') {
                 return fail(409, { 
                    error: 'You have already voted on this solution.',
                    voted_id: submission_id
                });
            }
            
            return fail(500, { 
                error: 'Could not record vote due to a server error.' 
            });
        }
        
        return { success: true, voted_id: submission_id };
    }
};