<script lang="ts">
    import {AppBar, Avatar, Drawer, drawerStore} from "@skeletonlabs/skeleton";
    import {authStore} from "$lib/stores/auth";
</script>

<AppBar
        padding="py-2 px-4"
        class="variant-glass-surface"
        background="bg-surface-300-600-token"
>
    <svelte:fragment slot="lead">
        <a class="text-xl font-bold uppercase" href="/">Let's School Central</a>
    </svelte:fragment>
    <svelte:fragment slot="trail">
        {#if $authStore.user}
            <Avatar
                    src={$authStore.user.avatar}
                    initials={$authStore.user.username[0]}
                    border="border-4 border-surface-300-600-token hover:!border-primary-500"
                    cursor="cursor-pointer"
                    width="w-10"
                    on:click={() => drawerStore.open()}
            />
        {:else }
            <a
                    class="btn btn-sm variant-ghost-surface"
                    href="/auth/login"
            >
                Login
            </a>
            <a
                    class="btn btn-sm variant-ghost-surface"
                    href="/auth/register"
            >
                Register
            </a>
        {/if}
    </svelte:fragment>
</AppBar>