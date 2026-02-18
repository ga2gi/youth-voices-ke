import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function load({ cookies }) {
    const voter_id = cookies.get('vote_session_id');

    // Fetch solutions
    const { data: solutions } = await supabase
        .from('solutions')
        .select('id, challenge_id, challenge_title, solution_text')
        .eq('is_featured', true);

    // Grouping logic
    const groupedChallenges = solutions?.reduce((acc, sol) => {
        const key = sol.challenge_id;
        if (!acc[key]) {
            acc[key] = { id: key, title: sol.challenge_title, options: [] };
        }
        acc[key].options.push(sol);
        return acc;
    }, {}) || {};

    // Get votes to disable buttons
    let userVotes = [];
    if (voter_id) {
        const { data } = await supabase
            .from('votes')
            .select('challenge_id')
            .eq('voter_id', voter_id);
        userVotes = data || [];
    }

    return { 
        challenges: Object.values(groupedChallenges), 
        userVotes 
    };
}

export const actions = {
    vote: async ({ request, cookies }) => {
        const formData = await request.formData();
        const solution_id = formData.get('solution_id');
        const challenge_id = formData.get('challenge_id');

        if (!solution_id || !challenge_id) {
            return fail(400, { error: 'Invalid selection.' });
        }

        // Handle Voter ID Cookie
        let voter_id = cookies.get('vote_session_id');
        if (!voter_id) {
            voter_id = crypto.randomUUID();
            cookies.set('vote_session_id', voter_id, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30,
                httpOnly: true,
                sameSite: 'strict'
            });
        }

        // Database Insert
        const { error } = await supabase
            .from('votes')
            .insert({
                submission_id: solution_id,
                challenge_id: challenge_id,
                voter_id: voter_id
            });

        if (error) {
            console.error("Supabase Error:", error.message);
            if (error.code === '23505') {
                return fail(409, { error: 'You have already voted on this challenge.' });
            }
            return fail(500, { error: 'System error. Please try again.' });
        }

        return { success: true };
    }
};