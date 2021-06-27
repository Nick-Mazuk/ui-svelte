<script lang="ts">
    export let icon: unknown
    export let text = ''
</script>

<button
    class="w-full h-full focus:outline-none flex flex-col items-center justify-center text-gray-700 hover:text-foreground transition-colors"
    on:click
>
    <span><svelte:component this="{icon}" size="{5}" /></span>
    {#if text}
        <p class="text-sm">{text}</p>
    {/if}
</button>
