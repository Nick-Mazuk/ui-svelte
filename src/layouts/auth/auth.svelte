<script lang="ts">
    import Button from '../../elements/button/button.svelte'
    import Container from '../../utilities/container/container.svelte'

    type Links = {
        value: string
        href: string
    }[]

    export let siteTitle: string
    export let logo = ''
    export let links: Links = []
</script>

<div class="flex items-center !max-w-xl min-h-screen py-8 wrapper">
    <main class="w-full" id="main-content">
        <div class="flex justify-around my-4">
            <a sveltekit:prefetch href="/" class="flex items-center space-x-2">
                {#if logo}
                    <img src="{logo}" class="h-10 w-10" alt="Go to homepage" />
                {/if}
                <span class="h5">{siteTitle}</span>
            </a>
        </div>
        <Container padding="{12}">
            <slot />
        </Container>
        {#if links.length > 0}
            <div class="my-4 flex justify-center">
                {#each links as link}
                    <Button variant="link" href="{link.href}">{link.value}</Button>
                {/each}
            </div>
        {/if}
    </main>
</div>
