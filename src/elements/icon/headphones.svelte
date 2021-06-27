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
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
</svg>
