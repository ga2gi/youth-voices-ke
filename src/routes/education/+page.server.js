// src/routes/education/+page.server.js
import { supabase } from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Fetch all civic education content
    const { data: content, error: contentError } = await supabase
        .from('civiceducation') // Ensure this is lowercase
        .select('*')
        .order('category', { ascending: true }) // Order by category first
        .order('topic', { ascending: true }); // Then by topic

    if (contentError) {
        console.error('Civic Education Load Error:', contentError);
        return fail(500, { message: 'Failed to load educational content.' });
    }
    
    // Group the content by category for easier display on the frontend
    const categorizedContent = content.reduce((acc, item) => {
        const category = item.category || 'General';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {});

    return { categorizedContent };
}