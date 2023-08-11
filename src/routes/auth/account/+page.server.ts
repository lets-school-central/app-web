import {redirect, setFlash} from "sveltekit-flash-message/server";
import {superValidate} from "sveltekit-superforms/server";
import {userUpdateSchema} from "$lib/schemas/user";
import {handleLoginRedirect, validateFile} from "$lib/utils";
import {error, fail} from "@sveltejs/kit";
import {serialize} from "object-to-formdata";

import type {PageServerLoad, Actions} from './$types';

export const load = (async (event) => {
    const {locals} = event;

    if (!locals.user) {
        throw redirect(303, handleLoginRedirect(event.url), {
            type: 'error',
            message: 'You must be logged in to view this page.'
        }, event);
    }

    return {
        form: await superValidate(userUpdateSchema)
    };
}) satisfies PageServerLoad;

export const actions = {
    default: async (event) => {
        const {locals, request, url} = event;

        const formData = await request.formData();
        const form = await superValidate(formData, userUpdateSchema);

        if (!form.valid) {
            return fail(400, {form});
        }

        const data = {...form.data};

        const avatar = formData.get('avatar');
        if (avatar && avatar instanceof File && avatar.size > 0) {
            validateFile(avatar);
            data.avatar = avatar;
        }

        console.log(data);

        try {
            const user = await locals.pocketbase
                .collection('users')
                .update(locals.user.id, serialize(data));

            locals.user = {...locals.user, ...user};
        } catch (err: any) {
            console.error(err);
            throw error(400, {
                message: err?.response?.message || err?.message || 'Unknown error'
            });
        }

        setFlash({ type: 'success', message: 'Profile updated successfully' }, event);
        return { form };
    }
} satisfies Actions;
