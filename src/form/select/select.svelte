<script lang="ts">
    import ChevronDown from '../../elements/icon/chevron-down.svelte'
    import { createEventDispatcher } from 'svelte'

    export let value = ''

    const dispatch = createEventDispatcher()

    const handleInput: svelte.JSX.FormEventHandler<HTMLSelectElement> = (event) => {
        event.currentTarget?.blur()
        dispatch('change', event.currentTarget.value)
    }

    export let hideIcon = false
</script>

<div class="relative text-gray-700 hover:text-gray-900 transition-colors">
    {#if $$slots.prefix}
        <div class="absolute h-full flex items-center top-0 left-2.5 pointer-events-none w-4">
            <slot name="prefix" />
        </div>
    {/if}
    <select
        class="text-sm bg-background w-full rounded text-gray-900 cursor-pointer border-gray-300 hover:border-gray focus:border-primary focus:ring-primary transition-colors"
        class:pl-8="{$$slots.prefix}"
        class:pr-8="{$$slots.suffix}"
        on:input|self="{handleInput}"
        value="{value}"
    >
        <slot />
    </select>
    {#if !hideIcon || $$slots.suffix}
        <div class="absolute h-full flex items-center top-0 right-2.5 pointer-events-none w-4">
            {#if $$slots.suffix}
                <slot name="suffix" />
            {:else}
                <ChevronDown />
            {/if}
        </div>
    {/if}
</div>
