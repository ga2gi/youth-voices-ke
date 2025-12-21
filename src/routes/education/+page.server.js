import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Fetch all content, ordered so Lessons appear in sequence
    const { data: content, error: contentError } = await supabase
        .from('civiceducation')
        .select('*')
        .order('category', { ascending: true })
        .order('created_at', { ascending: true });

    if (contentError) {
        console.error('Civic Education Load Error:', contentError);
        throw error(500, 'Failed to load educational content.');
    }

    // Grouping logic for the frontend categories
    const categorizedContent = content.reduce((acc, item) => {
        const category = item.category || 'General';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {});

    return { 
        categorizedContent,
        totalLessons: content.length 
    };
}