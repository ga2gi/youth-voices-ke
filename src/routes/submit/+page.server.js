// src/routes/submit/+page.server.js
import { supabase } from '$lib/supabaseClient'; 
import { fail } from '@sveltejs/kit';

/**
 * @type {import('./$types').PageServerLoad}
 * Fetches the list of active challenges from the Supabase database.
 * * UPDATE: Now includes 'pdf_url' in the select statement.
 */
export async function load() {
    const { data: challenges, error } = await supabase
        .from('challenges')
        // UPDATED: Include 'pdf_url' to link to the detailed challenge documents
        .select('id, title, pdf_url'); 

    if (error) {
        console.error('Database Error during challenge fetch:', error);
        throw new Error('Failed to load policy challenges from the server.');
    }
    
    return {
        challenges: challenges ?? []
    };
}


/**
 * @type {import('./$types').Actions}
 * Handles the form submission (POST request).
 * * UPDATE: Now handles the conditional 'other_stakeholder' field.
 */
export const actions = {
    submit: async ({ request }) => {
        const formData = await request.formData();

        // Retrieve form fields
        const challenge_title = formData.get('challenge_title');
        const solution_text = formData.get('solution_text');
        
        // --- STAKEHOLDER LOGIC START ---
        // Retrieve both the dropdown value and the conditional text input
        let responsible_stakeholder_dropdown = formData.get('responsible_stakeholder');
        const other_stakeholder_text = formData.get('other_stakeholder');

        let responsible_stakeholder;

        // If 'Other' was selected, use the text input, otherwise use the dropdown value.
        if (responsible_stakeholder_dropdown === 'Other') {
            responsible_stakeholder = other_stakeholder_text;
        } else {
            responsible_stakeholder = responsible_stakeholder_dropdown;
        }
        // --- STAKEHOLDER LOGIC END ---

        const implementation_timeline = formData.get('implementation_timeline');
        const supporting_evidence = formData.get('supporting_evidence') || null; 
        const optional_contact = formData.get('optional_contact') || null; 

        // Basic Server-side Validation
        if (!challenge_title || !solution_text || !responsible_stakeholder || !implementation_timeline) {
            return fail(400, { 
                success: false, 
                message: 'Missing required fields: Challenge, Solution, Stakeholder, or Timeline.' 
            });
        }
        
        // Check for empty 'Other' field if it was the source of the stakeholder value
        if (responsible_stakeholder_dropdown === 'Other' && !responsible_stakeholder) {
             return fail(400, { 
                success: false, 
                message: 'If "Other" stakeholder is selected, you must specify the responsible body.' 
            });
        }

        // Check minimum length for solution_text
        if (solution_text.length < 50) {
             return fail(400, { 
                 success: false, 
                 message: 'The solution proposal must be at least 50 characters long.' 
             });
        }
        
        // Ensure the declaration checkbox was checked
        if (!formData.has('declaration')) {
            return fail(400, { 
                success: false, 
                message: 'You must agree to the terms of submission.' 
            });
        }

        // 3. Insert the submission into the 'solutions' table in Supabase
        const { error: insertError } = await supabase
            .from('solutions') 
            .insert({
                challenge_title,
                solution_text,
                // The correct stakeholder value (category or custom text) is used here
                responsible_stakeholder, 
                implementation_timeline,
                supporting_evidence,
                optional_contact,
                created_at: new Date().toISOString()
            });

        if (insertError) {
            console.error('Supabase Insert Error:', insertError);
            return fail(500, { 
                success: false, 
                message: 'Database error: Failed to submit solution. Please check your network and try again.' 
            });
        }

        // 4. Return a success response
        return {
            success: true,
            message: 'Solution submitted successfully! It is now under review by the policy team.'
        };
    }
};