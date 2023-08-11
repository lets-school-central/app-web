import {error, fail} from '@sveltejs/kit';
import {superValidate} from 'sveltekit-superforms/server';
import {redirect} from 'sveltekit-flash-message/server';
import {userRegisterSchema} from "$lib/schemas/user";

import type {Actions, PageServerLoad} from './$types';

export const load = (async (event) => {
    const {locals} = event;

    if (locals.user) {
        throw redirect(303, '/', {type: 'error', message: 'You are already logged in!'}, event);
    }

    return {
        form: await superValidate(userRegisterSchema)
    };
}) satisfies PageServerLoad;

export const actions = {
    default: async (event) => {
        const {locals, request} = event;
        const form = await superValidate(request, userRegisterSchema);

        if (!form.valid) {
            return fail(400, {form});
        }

        try {
            await locals.pocketbase.collection('users').create(form.data);
            await locals.pocketbase.collection('users').requestVerification(form.data.email);
        } catch (err: any) {
            console.error(err);
            throw error(400, {
                message: err?.response?.message || err?.message || 'Unknown error'
            });
        }

        throw redirect(303, '/auth/login', {
            type: 'success',
            message: 'Your account has been created, please read your emails to validate it.'
        }, event);
    }
} satisfies Actions;
