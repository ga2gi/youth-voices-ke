// src/hooks.server.js
import { ADMIN_PASSWORD } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // Check if the user is accessing the protected /admin path
    const isProtected = event.url.pathname.startsWith('/admin');

    if (isProtected) {
        // 1. Check for the authentication cookie
        const authCookie = event.cookies.get('admin_auth');

        if (authCookie !== ADMIN_PASSWORD) {
            // 2. If the cookie is missing or incorrect, redirect to a simple login page
            if (event.url.pathname !== '/admin/login') {
                throw redirect(303, '/admin/login');
            }
        }
        // If the cookie matches the password, the request is allowed to continue
    }

    const response = await resolve(event);
    return response;
}