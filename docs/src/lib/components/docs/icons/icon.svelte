<script lang="ts">
    import { onMount } from 'svelte'
    export let name: string
    let icon: unknown
    onMount(async () => {
        icon = (
            await import(
                `../../../../../node_modules/@nick-mazuk/ui-svelte/src/elements/icon/${name}.svelte`
            )
        ).default
    })
</script>

<div class="flex items-center justify-center flex-grow h-32 w-32">
    <div class="flex flex-col items-center">
        <svelte:component this="{icon}" size="{6}" />
        <p class="!font-sans text-foreground !m-0 !mt-2">{name}</p>
    </div>
</div>
