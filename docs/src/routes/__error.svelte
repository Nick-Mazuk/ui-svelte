<script context="module" lang="ts">
    export const prerender = true

    export const load = ({ error, status }: { status: number; error: Error }) => {
        return {
            props: {
                error,
                status,
            },
        }
    }

</script>

<script lang="ts">
    import { dev } from '$app/env'
    import Http404 from '@nick-mazuk/ui-svelte/src/layouts/http-404/http-404.svelte'
    import Http500 from '@nick-mazuk/ui-svelte/src/layouts/http-500/http-500.svelte'

    export let status: number
    export let error: Error

</script>

{#if status === 404}
    <Http404 />
{:else}
    <Http500 status="{status}" error="{error}" isDevelopment="{dev}" />
{/if}
