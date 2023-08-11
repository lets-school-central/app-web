import {writable} from "svelte/store";

import type {z} from "zod";
import type {userSchema} from "$lib/schemas/user";

export type AuthStore = {
    user: z.infer<typeof userSchema> | undefined;
}

export const authStore = writable<AuthStore>({
    user: undefined,
});
