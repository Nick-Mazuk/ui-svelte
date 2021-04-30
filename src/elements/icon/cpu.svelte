<script lang="ts">
    export let size = 8
    export let strokeWidth = 1.5
    export let color = ''
    type Align = 'top' | 'middle' | 'bottom' | 'default'
    export let align: Align = 'default'
    export let title = ''
    export let flexNone = false

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
    class:flex-none="{flexNone}"
>
    {#if title}
        <title>{title}</title>
    {/if}
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>
</svg>
