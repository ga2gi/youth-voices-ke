// src/routes/admin/education/+page.server.js
import { supabase } from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Fetch all civic education content, sorted by category and topic
    const { data: content, error: contentError } = await supabase
        .from('civiceducation')
        .select('*')
        .order('category', { ascending: true })
        .order('topic', { ascending: true });

    if (contentError) {
        console.error('Admin Civic Education Load Error:', contentError);
        return { content: [] };
    }

    return { content: content || [] };
}

/** @type {import('./$types').Actions} */
export const actions = {
    // Action to create a new civic education item
    create: async ({ request }) => {
        const formData = await request.formData();
        
        const topic = formData.get('topic');
        const category = formData.get('category');
        const content_text = formData.get('content_text');
        const media_url = formData.get('media_url');

        // Basic validation
        if (!topic || !content_text) {
            return fail(400, { createError: 'Topic and Content Text are required.' });
        }

        const { error } = await supabase
            .from('civiceducation')
            .insert({
                topic,
                category: category || 'General',
                content_text,
                media_url: media_url || null, // Allow media_url to be null/empty
            });

        if (error) {
            console.error('Civic Education Creation Error:', error);
            return fail(500, { createError: 'Database error: Could not create educational content.' });
        }

        return { createSuccess: true };
    },

    // Action to delete a civic education item
    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        if (!id) {
            return fail(400, { deleteError: 'Invalid content ID.' });
        }

        const { error } = await supabase
            .from('civiceducation')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Civic Education Deletion Error:', error);
            return fail(500, { deleteError: 'Database error: Could not delete content.' });
        }

        return { deleteSuccess: true };
    }
};