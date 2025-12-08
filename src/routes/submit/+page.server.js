// src/routes/submit/+page.server.js
import { supabase } from '$lib/supabaseClient';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Fetch all active challenges (ID and Title) for the form dropdown
    const { data: challenges, error } = await supabase
        .from('challenges')
        .select('id, title')
        .order('title', { ascending: true });

    if (error) {
        console.error('Error fetching challenge list:', error);
        // Fail gracefully, allowing the page to load with an empty list
        return { challenges: [] }; 
    }

    return { challenges: challenges };
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        
        // Extract required fields
        const challenge_id = formData.get('challenge_id');
        const solution_text = formData.get('solution_text');
        const optional_contact = formData.get('optional_contact'); // Optional field

        // --- 1. Basic Validation ---
        if (!challenge_id || !solution_text) {
            return fail(400, { 
                challenge_id, 
                solution_text, 
                error: 'Please select a challenge and provide a solution.' 
            });
        }
        
        // --- 2. Supabase Insertion ---
        const { error: insertError } = await supabase
            .from('submissions')
            .insert({
                challenge_id: challenge_id,
                solution_text: solution_text,
                optional_contact: optional_contact || null, // Handle optional field
            });

        if (insertError) {
            console.error('Supabase Submission Error:', insertError);
            return fail(500, {
                challenge_id, 
                solution_text,
                error: 'A server error occurred. Please try again.'
            });
        }
        
        // --- 3. Success Redirect ---
        // Redirect the user after a successful submission
        throw redirect(303, '/submit?success=true');
    }
};