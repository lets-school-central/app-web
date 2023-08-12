<script lang="ts">
    import {superForm} from "sveltekit-superforms/client";
    import * as flashModule from "sveltekit-flash-message";
    import {userUpdateSchema} from "$lib/schemas/user";
    import {authStore} from "$lib/stores/auth";
    import {onMount} from "svelte";
    import {Accordion, AccordionItem} from "@skeletonlabs/skeleton";
    import {IMAGE_TYPES} from "$lib/constants";

    import type {PageData} from './$types';

    export let data: PageData;
    let defaultData: { username?: string, email?: string } = {};

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
        validators: userUpdateSchema,
        multipleSubmits: "prevent",
        onSubmit: (params) => {
            (["email", "username"] as const).forEach((key) => {
                if (params.formData.get(key) === $authStore.user?.[key])
                    params.formData.delete(key);
            });
        },
        onUpdated: () => {
            form.update(f => ({
                ...f,
                ...defaultData,
            }));
        },
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

    onMount(() => {
        return authStore.subscribe(({user}) => {
            if (!user) return;

            defaultData = {
                username: user.username,
                email: user.email,
            };
            form.update((f) => ({
                ...f,
                ...defaultData,
            }));
        });
    });
</script>


<div class="w-full flex flex-col items-center">
    <div class="card variant-glass-surface max-w-4xl w-full px-12 py-10 shadow-xl">
        <form method="POST" class="flex flex-col gap-10" enctype="multipart/form-data" use:enhance>

            <Accordion>
                <AccordionItem open>
                    <span slot="summary" class="text-2xl">General informations</span>

                    <div slot="content" class="flex flex-col gap-6">
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

                        <label for="email">
                            <span class="text-lg">Email</span>
                            <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    title="Your email"
                                    aria-invalid={$errors.email ? 'true' : undefined}
                                    class="input"
                                    bind:value={$form.email}
                                    class:input-error={$errors.email}
                                    disabled={$submitting}
                            />
                            {#if $errors.email}
                                <span class="text-error-500-400-token">{$errors.email}</span>
                            {/if}
                        </label>

                        <label for="avatar">
                            <span class="text-lg">Avatar</span>
                            <input
                                    id="avatar"
                                    type="file"
                                    name="avatar"
                                    title="Your avatar"
                                    aria-invalid={$errors.avatar ? 'true' : undefined}
                                    class="input"
                                    bind:value={$form.avatar}
                                    class:input-error={$errors.avatar}
                                    disabled={$submitting}
                                    accept={IMAGE_TYPES.join(",")}
                            />
                            {#if $errors.avatar}
                                <span class="text-error-500-400-token">{$errors.avatar}</span>
                            {/if}
                        </label>
                    </div>
                </AccordionItem>

                <AccordionItem>
                    <span slot="summary" class="text-2xl">Security</span>

                    <div slot="content" class="flex flex-col gap-6">
                        <label for="oldPassword">
                            <span class="text-lg">Current password</span>
                            <input
                                    id="oldPassword"
                                    type="password"
                                    name="oldPassword"
                                    title="Your old password"
                                    aria-invalid={$errors.oldPassword ? 'true' : undefined}
                                    class="input"
                                    bind:value={$form.oldPassword}
                                    class:input-error={$errors.oldPassword}
                                    disabled={$submitting}
                            />
                            {#if $errors.oldPassword}
                                <span class="text-error-500-400-token">{$errors.oldPassword}</span>
                            {/if}
                        </label>

                        <label for="password">
                            <span class="text-lg">New password</span>
                            <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    title="Your new password"
                                    aria-invalid={$errors.password ? 'true' : undefined}
                                    class="input"
                                    bind:value={$form.password}
                                    class:input-error={$errors.password}
                                    disabled={$submitting}
                            />
                            {#if $errors.password}
                                <span class="text-error-500-400-token">{$errors.password}</span>
                            {/if}
                        </label>

                        <label for="passwordConfirm">
                            <span class="text-lg">Confirm new password</span>
                            <input
                                    id="passwordConfirm"
                                    type="password"
                                    name="passwordConfirm"
                                    title="Your new password"
                                    aria-invalid={$errors.passwordConfirm ? 'true' : undefined}
                                    class="input"
                                    bind:value={$form.passwordConfirm}
                                    class:input-error={$errors.passwordConfirm}
                                    disabled={$submitting}
                            />
                            {#if $errors.passwordConfirm}
                                <span class="text-error-500-400-token">{$errors.passwordConfirm}</span>
                            {/if}
                        </label>
                    </div>
                </AccordionItem>
            </Accordion>

            <button type="submit" class="btn variant-filled-primary w-full" disabled={$delayed}>
                Save my account
            </button>

            {#if $timeout}
                <div class="text-xs">
                    <p>Hold on, we know the request is taking longer than expected...</p>
                    <p>It's probably just a slow connection, but you can try again if you want.</p>
                </div>
            {/if}

        </form>
    </div>
</div>
