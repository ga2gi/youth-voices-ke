// src/routes/vote/+page.server.js
import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import { fetchGroupedSubmissions } from '$lib/server/db'; 

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Use the robust helper function to fetch and group data, now including vote counts
    const submissions = await fetchGroupedSubmissions();

    if (submissions.length === 0) {
        return { submissions: [] };
    }

    return { submissions };
}

/** @type {import('./$types').Actions} */
export const actions = {
    vote: async ({ request, cookies }) => { 
        const formData = await request.formData();
        const submission_id = formData.get('submission_id');

        if (!submission_id) {
            return fail(400, { error: 'Invalid submission selected.' });
        }
        
        // --- Voter ID Logic ---
        let voter_id = cookies.get('vote_session_id');
        if (!voter_id) {
            voter_id = crypto.randomUUID(); 
            cookies.set('vote_session_id', voter_id, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30,
                httpOnly: true,
                sameSite: 'strict',
            });
        }
        
        // --- Submission Challenge Lookup ---
        // Get the challenge ID associated with the submission ID
        const { data: submissionData, error: lookupError } = await supabase
            .from('submissions')
            .select('challenge_id')
            .eq('id', submission_id)
            .single();

        if (lookupError || !submissionData) {
            return fail(500, { error: 'Could not find the associated challenge.' });
        }
        
        const challenge_id = submissionData.challenge_id;

        // --- One Vote Per Challenge Check (The Fix) ---
        // Find any existing vote by this voter_id where the submission's challenge_id matches the current challenge_id.
        const { data: existingVote, error: voteCheckError } = await supabase
            .from('votes')
            .select(`
                id, 
                submission_id!inner(challenge_id) 
            `)
            .eq('voter_id', voter_id)
            .eq('submission_id.challenge_id', challenge_id) // <-- Using the foreign key relationship filter
            .limit(1)
            .single();

        if (existingVote) {
             return fail(409, { error: `You have already voted on a solution for this challenge.`, voted_id: submission_id });
        }

        if (voteCheckError && voteCheckError.code !== 'PGRST116') {
             console.error('Vote check error:', voteCheckError);
             return fail(500, { error: 'Failed to verify existing votes.' });
        }

        // --- Insert New Vote ---
        const { error: insertError } = await supabase
            .from('votes')
            .insert({
                submission_id: submission_id,
                voter_id: voter_id,
                is_upvote: true
            });

        if (insertError) {
            console.error('Supabase Vote Insertion Error:', insertError);
            return fail(500, { error: 'Could not record vote due to a server error.' });
        }
        
        return { success: true, voted_id: submission_id };
    }
};