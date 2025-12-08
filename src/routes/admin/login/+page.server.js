// src/routes/admin/login/+page.server.js
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// Ensure the page redirects if the user is already logged in
/** @type {import('./$types').PageServerLoad} */
export function load({ cookies }) {
    if (cookies.get('admin_auth')) {
        throw redirect(302, '/admin');
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    /**
     * Handles the login attempt.
     */
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const password = data.get('password');
        const correctPassword = env.ADMIN_PASSWORD; // Securely retrieved from environment variables

        if (password === correctPassword) {
            // Success: Set the admin_auth cookie
            cookies.set('admin_auth', 'authenticated', {
                path: '/admin', // Accessible only within the admin path
                maxAge: 60 * 60 * 24 * 7, // 1 week
                httpOnly: true, // Not accessible via client-side JavaScript
                secure: process.env.NODE_ENV === 'production', // Use secure in production
            });
            throw redirect(302, '/admin');
        } else {
            // Failure
            return fail(401, { incorrect: true });
        }
    },

    /**
     * Handles the logout request by destroying the session cookie.
     */
    logout: async ({ cookies }) => {
        // --- 1. Destroy the Session Cookie ---
        cookies.set('admin_auth', '', {
            path: '/admin',
            maxAge: 0, // Setting maxAge to 0 forces immediate deletion
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });

        // --- 2. Redirect to Login ---
        throw redirect(302, '/admin/login');
    }
};