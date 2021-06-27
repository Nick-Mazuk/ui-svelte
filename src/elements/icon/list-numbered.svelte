<script lang="ts">
    export let size = 8
    export let strokeWidth = 1.5
    export let color = ''
    type Align = 'top' | 'middle' | 'bottom' | 'default'
    export let align: Align = 'default'
    export let title = ''
    export let flexNone = false
    export let fill = false
    export let stroke = true

    const ALIGN_MAP: Record<Align, string> = {
        top: 'vertical-align: text-top;',
        middle: 'vertical-align: middle;',
        bottom: 'vertical-align: text-bottom;',
        default: '',
    }

    $: dimensions = size * 4
    $: parsedColor = color ? `rgb(var(${color}))` : 'currentColor'
</script>

<svg
    viewBox="0 0 24 24"
    width="{dimensions}"
    height="{dimensions}"
    stroke="{stroke ? 'currentColor' : 'none'}"
    stroke-width="{strokeWidth}"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="{fill ? 'currentColor' : 'none'}"
    shape-rendering="geometricPrecision"
    style="color: {parsedColor}; {ALIGN_MAP[align]}"
    class:flex-none="{flexNone}"
>
    {#if title}
        <title>{title}</title>
    {/if}
    <path d="M8.503,6L21.503,6 M8.503,12L21.503,12 M8.503,18L21.503,18"></path><path d="M3.508,4.5L3.508,7.5 M4.513,16.5L4.513,19.5 M4.53,10.5L2.497,13.5 M2.513,10.5L4.513,10.5 M2.513,13.5L4.513,13.5 M2.513,19.5L4.513,19.5 M3.513,18L4.513,18 M2.513,16.5L4.513,16.5" stroke-width="{strokeWidth / 3}"></path>
</svg>
