<script lang="ts">
    import AlertCircle from '../icon/alert-circle.svelte'

    type Action = { text: string; href: string } | undefined
    type Size = 'small' | 'default' | 'large'
    export let action: Action = undefined
    export let label = 'Error'
    export let size: Size = 'default'
    export let dark = false

    let iconSize: number
    $: {
        if (size === 'small') iconSize = 3.5
        else if (size === 'default') iconSize = 4
        else iconSize = 5
    }
    let iconStrokeWeight: number
    $: {
        if (size === 'small') iconStrokeWeight = 2.5
        else if (size === 'default') iconStrokeWeight = 2
        else iconStrokeWeight = 1.5
    }
</script>

<div
    role="alert"
    aria-atomic="true"
    class="flex space-x-2 items-center"
    class:text-error="{!dark}"
    class:text-error-700="{dark}"
    class:text-sm="{size === 'small'}"
    class:text-lg="{size === 'large'}"
    data-test="error"
>
    <div class="flex items-center self-start flex-none">
        <span>&ZeroWidthSpace;</span>
        <AlertCircle size="{iconSize}" strokeWidth="{iconStrokeWeight}" />
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
