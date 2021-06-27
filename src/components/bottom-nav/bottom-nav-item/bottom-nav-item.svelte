<script lang="ts">
    import type { BottomNavItemVariant } from '.'

    export let icon: unknown
    export let text = ''
    export let variant: BottomNavItemVariant = 'gray'
    export let fillIcon = false

    const VARIANT_MAP: Record<BottomNavItemVariant, string> = {
        gray: 'text-gray dark:text-gray-700 hover:text-foreground dark:hover:text-foreground',
        primary: 'text-primary hover:text-primary-600',
        success: 'text-success hover:text-success-600',
        error: 'text-error hover:text-error-600',
        highlight: 'text-highlight hover:text-highlight-600',
        warning: 'text-warning hover:text-warning-600',
    }
</script>

<button
    class="w-full h-full focus:outline-none flex flex-col items-center justify-center {VARIANT_MAP[
        variant
    ]} transition-colors"
    on:click
>
    <span><svelte:component this="{icon}" size="{5}" fill="{fillIcon}" /></span>
    {#if text}
        <p class="text-sm font-semibold">{text}</p>
    {/if}
</button>
