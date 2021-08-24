<script lang="ts">
    import { writable } from 'svelte/store'
    import { setContext } from 'svelte'

    type Padding = 0 | 1 | 2 | 4 | 6 | 8 | 12 | 16

    type Rounded = 'none' | 'small' | 'default' | 'large' | 'larger'
    type Variant = 'disable' | 'click' | 'fill' | 'border' | 'shadow'

    export let padding: Padding | boolean = 6
    export let rounded: Rounded = 'default'
    export let variant: Variant | undefined = undefined
    export let href = ''
    export let role: svelte.JSX.HTMLAttributes<
        HTMLAnchorElement | HTMLDivElement
    >['role'] = undefined
    let classes = ''
    export { classes as class }
    export let style = ''
    export let id: string | undefined = undefined

    const disabledStore = writable(variant === 'disable')
    setContext('disabled', disabledStore)

    const PADDING_MAP: Record<Padding, string> = {
        0: '',
        1: 'p-1',
        2: 'p-2',
        4: 'p-4',
        6: 'p-6',
        8: 'p-8',
        12: 'p-12',
        16: 'p-16',
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
        shadow:
            'border border-transparent bg-background shadow-lg dark:shadow-none dark:border-gray-200',
    }

    const getPadding = (): string => {
        if (padding === true) return PADDING_MAP[6]
        if (padding === false || padding === 0) return PADDING_MAP[0]
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
    <a
        sveltekit:prefetch
        href="{href}"
        class="{classes}"
        role="{role}"
        style="{style}"
        id="{id}"
        tabindex="{0}"
        on:click
        on:focus
        on:blur
        on:mouseenter
        on:mouseleave
    >
        <slot />
    </a>
{:else}
    <div
        class="{classes}"
        role="{role}"
        style="{style}"
        id="{id}"
        on:click
        on:focus
        on:blur
        on:mouseenter
        on:mouseleave
    >
        <slot />
    </div>
{/if}
