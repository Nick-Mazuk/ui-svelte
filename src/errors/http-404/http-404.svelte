<script lang="ts">
    export let kicker = 'Oops…'
    export let title = 'This is awkward'
    export let message = "Looks like the page you're looking for doesn't exist."
    export let links: { href: string; text: string }[] = []
</script>

<div class="wrapper">
    <main class="mx-auto pt-32 sm:pt-48 pb-16 text-center max-w-lg">
        <h1 class="hidden">404</h1>
        <p class="h5">{kicker}</p>
        <p class="h3">{title}</p>
        <p class="mt-8 mb-12 balance">{message}</p>
        {#if links.length > 0}
            <div class="flex divide-x divide-light justify-center">
                {#each links as link}
                    <a href="{link.href}" class="link px-4"> {link.text} </a>
                {/each}
            </div>
        {/if}
    </main>
</div>
