<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const response = await fetch('icons.json')
        const json = await response.json()
        return {
            props: { icons: json.icons },
        }
    }
</script>

<script lang="ts">
    import Header from '$lib/components/docs/header.svelte'
    import Container from '@nick-mazuk/ui-svelte/src/utilities/container/container.svelte'
    import Icon from '$lib/components/docs/icons/icon.svelte'
    import SectionTitle from '$lib/components/docs/section-title.svelte'
    import type { AllIcons } from '$lib/lib/icons'

    export let icons: AllIcons = []
</script>

<Header title="Icons" description="A collection of beautiful icons extended from Feather icons." />

<SectionTitle title="Gallery" />
<Container class="flex justify-around flex-wrap">
    {#each icons as icon}
        <Icon name="{icon}" />
    {/each}
</Container>
