// src/routes/vote/+page.server.js
import { supabase } from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const { data: submissionsData, error: loadError } = await supabase
        .from('submissions') 
        .select(`
            id, 
            solution_text,
            is_shortlisted,
            challenge:challenge_id (title),
            vote_count:votes(count)
        `)
        .eq('is_shortlisted', true); 

    if (loadError) {
        console.error('Error fetching submissions for voting:', loadError);
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
    // NOTE: We now access the 'cookies' object here
    vote: async ({ request, cookies }) => { 
        const formData = await request.formData();
        const submission_id = formData.get('submission_id');

        if (!submission_id) {
            return fail(400, { error: 'Invalid submission selected.' });
        }
        
        // --- FIX: UNIQUE VOTER ID PER DEVICE ---
        let voter_id = cookies.get('vote_session_id');

        if (!voter_id) {
            // Generate a unique ID (UUID) for this new session/device
            voter_id = crypto.randomUUID(); 
            
            // Set the cookie to persist the unique ID for 30 days
            cookies.set('vote_session_id', voter_id, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30, // 30 days
                httpOnly: true, // Security best practice
                sameSite: 'strict',
            });
        }
        // ----------------------------------------

        const { error: insertError } = await supabase
            .from('votes')
            .insert({
                submission_id: submission_id,
                voter_id: voter_id, // Use the new, unique ID
                is_upvote: true
            });

        if (insertError) {
            console.error('Supabase Vote Insertion Error:', insertError);
            
            if (insertError.code === '23505') {
                 return fail(409, { 
                    // This error is now specifically for the current device/session
                    error: 'You have already voted on this solution with this device.',
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