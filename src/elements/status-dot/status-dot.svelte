<script lang="ts">
    type Variant = 'primary' | 'gray' | 'error' | 'highlight' | 'warning' | 'success'
    export let variant: Variant = 'gray'
    export let ping = false

    const VARIANT_MAP: Record<Variant, string> = {
        primary: 'bg-primary-400',
        gray: 'bg-gray-400',
        error: 'bg-error-400',
        highlight: 'bg-highlight-400',
        warning: 'bg-warning-400',
        success: 'bg-success-400',
    }

    $: dotClasses = `absolute w-2 h-2 rounded-full ${VARIANT_MAP[variant]}`
</script>

<div class="relative w-2 h-2">
    <div class="{dotClasses}"></div>
    {#if ping}
        <div class="{dotClasses} animate-ping"></div>
    {/if}
</div>
