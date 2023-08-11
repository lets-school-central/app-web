import {loadFlash} from 'sveltekit-flash-message/server';

import type {LayoutServerLoad} from './$types';

export const load = loadFlash(async ({locals}) => {
    if (locals.user) {
        return {
            user: {
                ...locals.user,
                avatar: locals.user.avatar ? locals.pocketbase.files.getUrl(locals.user, locals.user.avatar) : undefined,
            }
        };
    }

    return {
        user: undefined
    };
}) satisfies LayoutServerLoad;
