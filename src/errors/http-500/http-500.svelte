<script lang="ts">
    export let status: number
    export let error: Error
    export let isDevelopment: boolean
    export let message: string =
        "It's not you, it's me. Our systems made a mistake and we could not process your request. Try refreshing the page."

    let stack: string[]

    $: stack = error.stack?.split('\n').map((part) => part.trim()) ?? []
</script>

<div class="wrapper">
    <main class="mx-auto pt-32 sm:pt-48 pb-16 text-center max-w-lg">
        <h1 class="hidden">{status} Error</h1>
        <section class="border border-error rounded-lg w-full text-error px-8 py-6">
            <p class="h5">Oops…</p>
            <p class="h3">Internal error</p>
            <p class="mt-8 balance">{isDevelopment ? error.message : message}</p>
        </section>
    </main>
    {#if isDevelopment}
        <pre
            class="overflow-scroll mb-16 p-4 rounded-lg bg-error-50 bg-opacity-50">
            <code>
        
                {#each stack as line}
                    <p class="text-error">{line}</p>
                {/each}
            </code>
        </pre>
    {/if}
</div>
