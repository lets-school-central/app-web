import {error, fail} from '@sveltejs/kit';
import {superValidate} from 'sveltekit-superforms/server';
import {redirect} from 'sveltekit-flash-message/server';
import {userLoginSchema} from "$lib/schemas/user";

import type {Actions, PageServerLoad} from './$types';

export const load = (async (event) => {
    const {locals} = event;

    if (locals.user) {
        throw redirect(303, '/', {type: 'error', message: 'You are already logged in!'}, event);
    }

    return {
        form: await superValidate(userLoginSchema)
    };
}) satisfies PageServerLoad;

export const actions = {
    default: async (event) => {
        const {locals, request, url} = event;
        const form = await superValidate(request, userLoginSchema);

        if (!form.valid) {
            return fail(400, {form});
        }

        try {
            await locals.pocketbase.collection('users').authWithPassword(form.data.username, form.data.password);
            if (!locals.pocketbase?.authStore?.model?.verified) {
                locals.pocketbase.authStore.clear();
                form.errors.username = ['Email not verified. Please check your email for a verification link.'];
                return fail(401, {form});
            }
        } catch (err: any) {
            console.error(err);
            throw error(400, {
                message: err?.response?.message || err?.message || 'Unknown error'
            });
        }

        const redirectTo = url.searchParams.get('redirectTo');
        if (redirectTo) {
            throw redirect(303, `/${redirectTo.slice(1)}`);
        }

        throw redirect(303, '/', {type: 'success', message: 'You are now logged in!'}, event);
    }
} satisfies Actions;
