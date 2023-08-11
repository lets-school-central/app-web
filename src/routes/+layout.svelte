<script lang='ts'>
    import '@skeletonlabs/skeleton/themes/theme-crimson.css';
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    import '../app.postcss';

    import {getFlash} from 'sveltekit-flash-message';
    import {
        AppShell,
        autoModeWatcher,
        Avatar,
        Drawer,
        drawerStore,
        LightSwitch,
        Toast,
        toastStore
    } from '@skeletonlabs/skeleton';
    import {authStore} from "$lib/stores/auth";
    import {page, updated} from '$app/stores';
    import Header from "$components/Header.svelte";
    import {XCircle} from "lucide-svelte";
    import {onMount} from "svelte";

    import type {PageData} from "./$types";
    import {beforeNavigate} from "$app/navigation";

    export let data: PageData;

    const flash = getFlash(page, {
        clearOnNavigate: false,
    });

    $: authStore.update((store) => ({...store, user: data.user ?? undefined}));

    onMount(() => {
        let lastRoute = $page.route;

        const pageUnsubscribe = page.subscribe((p) => {
            if (p.route === lastRoute) return;

            lastRoute = p.route;
            drawerStore.close();
        });
        const flashUnsubscribe = flash.subscribe(($flash) => {
            if (!$flash) return;

            toastStore.trigger({
                message: $flash.message,
                background: $flash.type === 'error' ? 'variant-filled-error' : 'variant-filled-secondary',
                timeout: 5000,
                hoverable: true,
            });

            flash.set(undefined);
        });

        return () => {
            pageUnsubscribe();
            flashUnsubscribe();
        };
    });

    beforeNavigate(({willUnload, to}) => {
        if ($updated && !willUnload && to?.url) {
            location.href = to.url.href;
        }
    });

    let positionClasses = ''
    $: positionClasses = $drawerStore.open ? '-translate-x-[25%]' : '';
</script>

<svelte:head>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head>
<!-- we set it in a hidden div, just to load and initialize the component, because it requires to be present on page load -->
<div class="hidden">
    <LightSwitch/>
</div>

<Toast/>
<Drawer
        position="right"
        bgDrawer="bg-surface-200-700-token text-white"
        bgBackdrop="bg-gradient-to-tr from-secondary-500/40 via-tertiary-500/40 to-primary-500/40 backdrop-blur"
        width="w-[280px] md:w-[480px]"
        padding="p-4"
        rounded="rounded-xl"
        shadow="shadow-xl"
>
    <div class="flex flex-col h-full w-full justify-between px-8 py-4">
        <div class="flex flex-col gap-6">
            {#if $authStore.user}
                <div class="flex items-center gap-4 h-32">
                    {#if $authStore.user.avatar}
                        <Avatar
                                width="w-32"
                                src={$authStore.user.avatar}
                        />
                    {/if}
                    <div class="flex flex-col gap-2">
                        <span class="text-4xl text-primary-500-400-token">@{$authStore.user.username}</span>
                        <span class="text-sm text-surface-600-300-token">{$authStore.user.email}</span>
                    </div>
                </div>

                <div class="btn-group variant-filled">
                    <a class="basis-1/2" href="/auth/account">Account</a>
                    <form class="basis-1/2" action="/auth/logout" method="POST">
                        <button class="w-full" type="submit">Logout</button>
                    </form>
                </div>
            {/if}
        </div>
        <div class="self-end">
            <LightSwitch/>
        </div>
    </div>
</Drawer>

<AppShell class="transition-transform {positionClasses}">
    <div slot="header" class="mt-5">
        <div class="container h-full mx-auto flex flex-col rounded-2xl overflow-hidden border border-surface-400-500-token">
            <Header/>
        </div>
    </div>

    <main class="container h-full mx-auto flex flex-col py-24 rounded-b-2xl">
        {#if $flash}
            <div class="alert variant-filled-error mb-10">
                <div>
                    <XCircle/>
                </div>
                <p class="alert-message">{$flash.message}</p>
            </div>
        {/if}

        <slot/>
    </main>
</AppShell>
