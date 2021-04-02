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
    <circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>
</svg>
