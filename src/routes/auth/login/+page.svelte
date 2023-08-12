<script lang="ts">
    import {superForm} from "sveltekit-superforms/client";
    import * as flashModule from "sveltekit-flash-message";
    import {userLoginSchema} from "$lib/schemas/user";

    import type {PageData} from './$types';

    export let data: PageData;

    const {
        enhance,
        submitting,
        delayed,
        timeout,
        capture,
        restore,
        form,
        errors,
    } = superForm(data.form, {
        validators: userLoginSchema,
        multipleSubmits: "prevent",
        flashMessage: {
            module: flashModule,
            onError: ({result, message}) => {
                message.set({
                    type: "error",
                    message: result.error.message,
                });
            },
        },
        syncFlashMessage: true,
    });
    export const snapshot = {capture, restore};
</script>

<div class="w-full flex flex-col items-center">
    <div class="card variant-glass-surface max-w-xl w-full px-12 py-10 shadow-xl">
        <form method="POST" use:enhance>

            <div class="flex flex-col gap-6">
                <label for="username">
                    <span class="text-lg">Username</span>
                    <input
                            id="username"
                            type="text"
                            name="username"
                            title="Your username"
                            aria-invalid={$errors.username ? 'true' : undefined}
                            class="input"
                            bind:value={$form.username}
                            class:input-error={$errors.username}
                            disabled={$submitting}
                    />
                    {#if $errors.username}<span class="text-error-500-400-token">{$errors.username}</span>{/if}
                </label>

                <label class="label" for="password">
                    <span class="text-lg">Password</span>
                    <input
                            id="password"
                            type="password"
                            name="password"
                            title="Your password"
                            aria-invalid={$errors.password ? 'true' : undefined}
                            class="input"
                            bind:value={$form.password}
                            class:input-error={$errors.password}
                            disabled={$submitting}
                    />
                    {#if $errors.password}<span class="text-error-500-400-token">{$errors.password}</span>{/if}
                </label>
            </div>

            <button type="submit" class="btn variant-filled-primary w-full mt-10" disabled={$delayed}>
                Login to my account
            </button>

            {#if $timeout}
                <div class="text-xs">
                    <p>Hold on, we know the request is taking longer than expected...</p>
                    <p>It's probably just a slow connection, but you can try again if you want.</p>
                </div>
            {/if}
        </form>

        <hr class="my-10"/>

        <a href="/auth/register" class="btn btn-sm variant-glass-surface w-full" role="button">
            Don't have an account? Register here
        </a>
    </div>
</div>
