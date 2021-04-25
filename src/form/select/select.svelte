<script lang="ts">
    import ChevronDown from '../../elements/icon/chevron-down.svelte'
    import { createEventDispatcher } from 'svelte'

    export let value = ''

    const dispatch = createEventDispatcher()

    const handleInput: svelte.JSX.FormEventHandler<HTMLSelectElement> = (event) => {
        event.currentTarget?.blur()
        dispatch('change', event.currentTarget.value)
    }

    export let hideArrow = false
    export let title = ''
</script>

<div class="relative text-gray-500 hover:text-gray-700 transition-colors">
    {#if $$slots.prefix}
        <div class="absolute h-full flex items-center top-0 left-2.5 pointer-events-none w-4">
            <slot name="prefix" />
        </div>
    {/if}
    <select
        class="bg-background h-10 w-full text-base rounded border-gray-200 text-gray-700 hover:text-gray-900 focus:text-gray-900 cursor-pointer hover:border-gray focus:border-primary focus:ring-primary transition-colors"
        class:pl-8="{$$slots.prefix}"
        class:pr-8="{$$slots.suffix}"
        on:input|self="{handleInput}"
        value="{value}"
        title="{title}"
    >
        <slot />
    </select>
    {#if !hideArrow || $$slots.suffix}
        <div class="absolute h-full flex items-center top-0 right-2.5 pointer-events-none w-4">
            {#if $$slots.suffix}
                <slot name="suffix" />
            {:else}
                <ChevronDown />
            {/if}
        </div>
    {/if}
</div>
