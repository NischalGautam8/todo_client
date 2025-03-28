import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
    if (browser) {
        const token = localStorage.getItem('token');
        const isLoginPage = url.pathname === '/login';
        const isSignupPage = url.pathname === '/signup';

        if (!token && !isLoginPage && !isSignupPage) {
            goto('/login');
        } else if (token && isLoginPage) {
            goto('/');
        }
    }

    return {};
};