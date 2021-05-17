<script lang="ts">
    import AlertCircle from '../icon/alert-circle.svelte'

    type Action = { text: string; href: string } | undefined
    type Size = 'default' | 'large'
    export let action: Action = undefined
    export let label = 'Error'
    export let size: Size = 'default'
    export let dark = false

</script>

<div
    role="alert"
    aria-atomic="true"
    class="flex space-x-2 items-center"
    class:text-error="{!dark}"
    class:text-error-700="{dark}"
    class:text-lg="{size === 'large'}"
    data-test="error"
>
    <div class="flex items-center self-start flex-none">
        <span>&ZeroWidthSpace;</span>
        <AlertCircle
            size="{size === 'default' ? 4 : 5}"
            strokeWidth="{size === 'default' ? 2 : 1.5}"
        />
    </div>
    <p>
        {#if label}
            <span class="font-bold">{label}:</span>
        {/if}
        <slot />
        {#if action}
            <a
                href="{action.href}"
                class="border-b border-error font-semibold inline-flex items-center space-x-1"
                sveltekit:prefetch
            >
                {action.text}&nbsp;→
            </a>
        {/if}
    </p>
</div>
