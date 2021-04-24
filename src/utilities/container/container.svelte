<script lang="ts">
    type Padding =
        | 'none'
        | 'smallest'
        | 'smaller'
        | 'small'
        | 'default'
        | 'large'
        | 'larger'
        | 'largest'

    type Rounded = 'none' | 'small' | 'default' | 'large' | 'larger'
    type Variant = 'disable' | 'click' | 'fill' | 'border'

    export let padding: Padding | boolean = 'default'
    export let rounded: Rounded = 'default'
    export let variant: Variant | undefined = undefined
    export let href = ''

    const PADDING_MAP: Record<Padding, string> = {
        none: '',
        smallest: 'p-1',
        smaller: 'p-2',
        small: 'p-4',
        default: 'p-6',
        large: 'p-8',
        larger: 'p-12',
        largest: 'p-16',
    }

    const ROUNDED_MAP: Record<Rounded, string> = {
        none: '',
        small: 'rounded',
        default: 'rounded-lg',
        large: 'rounded-xl',
        larger: 'rounded-3xl',
    }

    const VARIANT_MAP: Record<Variant, string> = {
        disable: 'border bg-gray-50 text-gray cursor-not-allowed',
        click:
            'border border-opacity-100 hover:shadow-xl hover:border-transparent dark:hover:shadow-none dark:hover:border-gray-900 transition cursor-pointer',
        fill: 'border bg-gray-50',
        border: 'border',
    }

    const getPadding = (): string => {
        if (padding === true) return PADDING_MAP.default
        if (padding === false || padding === 'none') return PADDING_MAP.none
        return PADDING_MAP[padding]
    }

    $: classes = [
        'overflow-hidden block',
        getPadding(),
        ROUNDED_MAP[rounded],
        VARIANT_MAP[variant ?? (href ? 'click' : 'border')],
    ].join(' ')
</script>

{#if href}
    <a sveltekit:prefetch href="{href}" class="{classes}" on:click>
        <slot />
    </a>
{:else}
    <div class="{classes}" on:click>
        <slot />
    </div>
{/if}
