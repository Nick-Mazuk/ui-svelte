<script lang="ts">
    import { writable } from 'svelte/store'
    import { setContext } from 'svelte'
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
    type Variant = 'disable' | 'click' | 'fill' | 'border' | 'shadow'

    export let padding: Padding | boolean = 'default'
    export let rounded: Rounded = 'default'
    export let variant: Variant | undefined = undefined
    export let href = ''
    let classes = ''
    export { classes as class }

    const disabledStore = writable(variant === 'disable')
    setContext('disabled', disabledStore)

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
        disable: 'border bg-gray-100 text-gray cursor-not-allowed select-none filter grayscale',
        click:
            'border bg-background border-opacity-100 hover:shadow-xl hover:border-transparent dark:hover:shadow-none dark:hover:border-gray-900 transition cursor-pointer active:bg-gray-100',
        fill: 'border bg-gray-100',
        border: 'border bg-background',
        shadow: 'border border-transparent shadow-lg dark:shadow-none dark:border-gray-200',
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
        classes,
        VARIANT_MAP[variant ?? (href ? 'click' : 'border')],
    ].join(' ')
    $: disabledStore.set(variant === 'disable')
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
