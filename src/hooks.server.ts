import PocketBase from 'pocketbase';
import {flashCookieOptions} from 'sveltekit-flash-message/server';

import type {Handle} from "@sveltejs/kit";
import {dev} from "$app/environment";

export const handle = (async ({event, resolve}) => {
    const {locals, request} = event;

    locals.pocketbase = new PocketBase(dev ? 'http://127.0.0.1:8090' : 'https://backend.lets-school-central.app');
    locals.pocketbase.authStore.loadFromCookie(request.headers.get('cookie') || '');

    try {
        locals.pocketbase.authStore.isValid && await locals.pocketbase.collection('users').authRefresh();
    } catch (_) {
        locals.pocketbase.authStore.clear();
    }

    if (locals.pocketbase.authStore.isValid) {
        locals.user = JSON.parse(JSON.stringify(locals.pocketbase.authStore.model));
    } else {
        locals.user = undefined;
    }

    const response = await resolve(event);

    response.headers.append(
        'set-cookie',
        locals.pocketbase.authStore.exportToCookie({secure: !dev})
    );

    return response;
}) satisfies Handle;
