// src/routes/admin/challenges/+page.server.js
import { supabase } from '$lib/supabaseClient';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Fetch all challenges, ordered by creation date
    const { data: challenges, error: challengesError } = await supabase
        .from('challenges')
        .select('*')
        .order('created_at', { ascending: false });

    if (challengesError) {
        console.error('Admin Challenges Load Error:', challengesError);
        return { challenges: [] };
    }

    return { challenges: challenges || [] };
}

/** @type {import('./$types').Actions} */
export const actions = {
    // Action to create a new challenge
    create: async ({ request }) => {
        const formData = await request.formData();
        
        const title = formData.get('title');
        const category = formData.get('category');
        const overview_text = formData.get('overview_text');
        const pdf_url = formData.get('pdf_url');
        const is_featured = formData.get('is_featured') === 'on'; // Checkbox value

        if (!title || !overview_text || !pdf_url) {
            return fail(400, { createError: 'Please fill in all required fields (Title, Overview, PDF URL).' });
        }

        const { error } = await supabase
            .from('challenges')
            .insert({
                title,
                category: category || 'General',
                overview_text,
                pdf_url,
                month_highlighted: is_featured,
            });

        if (error) {
            console.error('Challenge Creation Error:', error);
            return fail(500, { createError: 'Database error: Could not create challenge.' });
        }

        return { createSuccess: true };
    },

    // Action to update an existing challenge's featured status
    toggle_featured: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const current_status = formData.get('current_status') === 'true'; // Convert string to boolean
        
        if (!id) {
            return fail(400, { toggleError: 'Invalid challenge ID.' });
        }

        const { error } = await supabase
            .from('challenges')
            .update({ month_highlighted: !current_status })
            .eq('id', id);

        if (error) {
            console.error('Toggle Featured Error:', error);
            return fail(500, { toggleError: 'Database error: Could not update status.' });
        }

        return { toggleSuccess: true, updatedId: id };
    },

    // Action to delete a challenge
    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        if (!id) {
            return fail(400, { deleteError: 'Invalid challenge ID.' });
        }

        const { error } = await supabase
            .from('challenges')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Challenge Deletion Error:', error);
            // NOTE: A deletion error might occur if submissions/votes are linked (foreign key constraint).
            return fail(500, { deleteError: 'Database error: Cannot delete challenge (submissions may be linked).' });
        }

        return { deleteSuccess: true };
    }
};