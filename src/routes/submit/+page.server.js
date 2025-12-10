// src/routes/submit/+page.server.js

import { supabase } from '$lib/supabaseClient';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        
        // Updated data fields matching the new 4 pillars + challenge selection
        const challenge_title = formData.get('challenge_title');
        const solution_text = formData.get('solution_text');
        const responsible_stakeholder = formData.get('responsible_stakeholder');
        const implementation_timeline = formData.get('implementation_timeline');
        const supporting_evidence = formData.get('supporting_evidence'); // Optional
        const optional_contact = formData.get('optional_contact'); // Optional
        
        // 1. Basic server-side validation for required fields
        if (
            !challenge_title || 
            !solution_text || 
            !responsible_stakeholder || 
            !implementation_timeline ||
            solution_text.length < 50
        ) {
            return fail(400, { 
                error: 'Please ensure you select a challenge, provide a detailed solution (min 50 chars), and fill in the Stakeholder and Timeline fields.' 
            });
        }
        
        // 2. Database insertion (Ensure your Supabase 'submissions' table has columns for the new fields)
        const { error } = await supabase.from('submissions').insert({
            challenge_title,
            solution_text,
            responsible_stakeholder,
            implementation_timeline,
            supporting_evidence,
            optional_contact,
        });

        if (error) {
            console.error('Submission Error:', error);
            return fail(500, { error: 'A server error occurred during submission. Please try again.' });
        }

        // 3. Success redirect
        throw redirect(303, '/recognition');
    }
};