<script lang="ts">
    export let size = 6
    export let strokeWidth = 1.5
    export let color = ''
    type Align = 'top' | 'middle' | 'bottom' | 'default'
    export let align: Align = 'default'
    export let title = ''

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
    stroke="currentColor"
    stroke-width="{strokeWidth}"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
    shape-rendering="geometricPrecision"
    style="color: {parsedColor}; {ALIGN_MAP[align]}"
>
    {#if title}
        <title>{title}</title>
    {/if}
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
</svg>
