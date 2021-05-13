<script lang="ts">
    import { tweened } from 'svelte/motion'
    import { cubicOut } from 'svelte/easing'

    type Variant = 'primary' | 'gray'
    export let max = 100
    export let value = 50
    export let variant: Variant = 'gray'
    export let ariaLabel: string

    const displayValue = tweened(0, {
        duration: 150,
        easing: cubicOut,
    })

    const VARIANT_MAP: Record<Variant, string> = {
        primary: 'bg-primary',
        gray: 'bg-gray',
    }

    let constrainedValue: number
    $: {
        constrainedValue = Math.max(0, Math.min(value, max))
        displayValue.set((constrainedValue / max) * 100)
    }
</script>

<div
    class="h-2 relative rounded-full overflow-hidden"
    role="progressbar"
    aria-valuenow="{constrainedValue}"
    aria-valuemin="0"
    aria-valuemax="{max}"
    aria-label="{ariaLabel}"
>
    <div class="w-full h-full bg-gray-200 absolute"></div>
    <div
        class="h-full {VARIANT_MAP[variant]} absolute rounded-full"
        style="{`width: ${$displayValue}%`}"
    ></div>
</div>
