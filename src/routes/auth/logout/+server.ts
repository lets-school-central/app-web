import {redirect} from "sveltekit-flash-message/server";

import type {RequestHandler} from './$types';

export const POST = ((event) => {
    const {locals} = event;

    if (!locals.user) {
        throw redirect(303, '/auth/login');
    }

    locals.pocketbase.authStore.clear();
    locals.user = undefined;

    throw redirect(303, '/auth/login', {type: 'success', message: 'You have been logged out.'}, event);
}) satisfies RequestHandler;
