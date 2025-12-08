// src/routes/admin/briefs-tracking/+page.server.js
import { supabase } from '$lib/supabaseClient';
import { fail, redirect } from '@sveltejs/kit';

// Define the valid status options (must match the tracking logic)
const STATUS_OPTIONS = [
    'Delivered', 
    'Acknowledged', 
    'In Review', 
    'Implemented'
];

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Fetch all policy briefs, ordered by delivery date
    const { data: briefs, error: briefsError } = await supabase
        .from('policybriefs')
        .select('*')
        .order('delivery_date', { ascending: false });

    if (briefsError) {
        console.error('Admin Policy Briefs Load Error:', briefsError);
        return fail(500, { message: 'Failed to load policy briefs data.' });
    }

    return { 
        policyBriefs: briefs || [],
        statusOptions: STATUS_OPTIONS
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    /**
     * Action to create a NEW policy brief entry.
     */
    create: async ({ request }) => {
        const formData = await request.formData();
        
        const title = formData.get('title');
        const description = formData.get('description');
        const delivery_date = formData.get('delivery_date');
        
        if (!title || !description || !delivery_date) {
            return fail(400, { createError: 'Title, description, and delivery date are required.' });
        }

        const { error: createError } = await supabase
            .from('policybriefs')
            .insert({
                title,
                description,
                delivery_date,
                status: 'Delivered', // Default status for a new brief
                stakeholder_acknowledged: null
            });

        if (createError) {
            console.error('Supabase Brief Creation Error:', createError);
            return fail(500, { createError: 'A server error occurred while creating the brief.' });
        }
        
        return { createSuccess: true };
    },

    /**
     * Action to update the status of an EXISTING policy brief.
     */
    update_status: async ({ request }) => {
        const formData = await request.formData();
        
        const id = formData.get('id');
        const new_status = formData.get('status');
        const stakeholder = formData.get('stakeholder');

        // --- 1. Basic Validation ---
        if (!id || !new_status || !STATUS_OPTIONS.includes(new_status)) {
            return fail(400, { error: 'Invalid brief ID or status provided.' });
        }

        // --- 2. Supabase Update ---
        const { error: updateError } = await supabase
            .from('policybriefs')
            .update({
                status: new_status,
                // Only update the acknowledged field if the status is 'Acknowledged' or later
                stakeholder_acknowledged: stakeholder || null 
            })
            .eq('id', id);

        if (updateError) {
            console.error('Supabase Brief Update Error:', updateError);
            return fail(500, {
                id, 
                error: 'A server error occurred while updating the status.'
            });
        }
        
        // Return success object (no redirect needed, stay on page to allow further updates)
        return { success: true, updatedId: id };
    }
};