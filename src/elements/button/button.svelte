<script lang="ts">
    import LoadingSpinner from '../../elements/loading-spinner/loading-spinner.svelte'
    import type { Writable } from 'svelte/store'
    import { getContext } from 'svelte'

    type Variant =
        | 'primary'
        | 'error'
        | 'success'
        | 'warning'
        | 'gray'
        | 'highlight'
        | 'secondary'
        | 'link'
        | 'static'
    type Size = 'small' | 'default' | 'large'
    type Shape = 'square' | 'circle' | 'none'

    export let variant: Variant = 'primary'
    export let size: Size = 'default'
    export let shadow = false
    export let disabled = false
    export let loading = false
    export let width: number | 'full' = 0
    export let shape: Shape = 'none'
    export let submit = false
    export let ariaLabel = ''
    export let href = ''

    const disabledContext = getContext<Writable<boolean> | undefined>('disabled')

    let isActive = false
    let isHovered = false

    type ButtonStyling = {
        classes: string
        disabled?: string
    }

    const disabledClasses = 'bg-gray-200 text-gray cursor-not-allowed'
    const STYLES_MAP: Record<Variant, ButtonStyling> = {
        primary: {
            classes:
                'bg-primary border-primary text-background hover:bg-primary-600 hover:border-primary-600 active:bg-primary-700 active:border-primary-700 focus:ring-primary dark:text-foreground',
        },
        error: {
            classes:
                'bg-error border-error text-background hover:bg-error-600 hover:border-error-600 active:bg-error-700 active:border-error-700 focus:ring-error dark:text-foreground',
        },
        success: {
            classes:
                'bg-success border-success text-background hover:bg-success-600 hover:border-success-600 active:bg-success-700 active:border-success-700 focus:ring-success dark:text-foreground',
        },
        warning: {
            classes:
                'bg-warning border-warning text-background hover:bg-warning-600 hover:border-warning-600 active:bg-warning-700 active:border-warning-700 focus:ring-warning dark:text-foreground',
        },
        highlight: {
            classes:
                'bg-highlight border-highlight text-background hover:bg-highlight-600 hover:border-highlight-600 active:bg-highlight-700 active:border-highlight-700 focus:ring-highlight dark:text-foreground',
        },
        gray: {
            classes:
                'bg-gray border-gray text-background hover:bg-gray-600 hover:border-gray-600 active:bg-gray-700 active:border-gray-700 focus:ring-gray dark:text-foreground',
        },
        secondary: {
            classes: `bg-transparent text-gray-600 ${
                shadow
                    ? 'border-transparent'
                    : 'hover:border-gray-900 hover:text-gray-900 active:bg-gray-200'
            } focus:ring-gray-900`,
            disabled: 'text-gray-300 border cursor-not-allowed',
        },
        link: {
            classes: `border-transparent bg-transparent link ${
                shadow ? 'hover:no-underline' : ''
            } focus:ring-link`,
            disabled: 'text-gray-300 border-transparent cursor-not-allowed',
        },
        static: {
            classes: 'border-transparent focus:ring-gray-900',
            disabled: 'text-gray-300 border-transparent cursor-not-allowed',
        },
    }

    type SizeData = {
        global: string
        prefix: string
        suffix: string
        loadingSpinner: string
    }

    const SIZE_MAP: Record<Size, SizeData> = {
        small: {
            global: 'px-3 h-8',
            loadingSpinner: 'transform scale-50 top-1/2 mt-0.5 -translate-y-1/2 absolute',
            prefix: 'flex w-4 mr-2 -ml-1 relative',
            suffix: 'flex w-4 ml-1 -mr-1',
        },
        default: {
            global: 'px-4 h-10',
            loadingSpinner: 'transform scale-75 top-1/2 mt-0.5 -translate-y-1/2 absolute',
            prefix: 'flex w-5 mr-2 -ml-1 relative',
            suffix: 'flex w-5 ml-2 -mr-1',
        },
        large: {
            global: 'px-4 h-12 text-lg',
            loadingSpinner: 'transform scale-90 top-1/2 mt-0.5 -translate-y-1/2 absolute',
            prefix: 'flex w-6 mr-2 -ml-1 relative',
            suffix: 'flex w-6 ml-2 -mr-1',
        },
    }

    const SHAPE_MAP: Record<Shape, Record<Size, string>> = {
        square: {
            small: 'w-8 !px-1.5',
            default: 'w-10 !px-2',
            large: 'w-12 !px-2.5',
        },
        circle: {
            small: 'w-8 !px-1.5 rounded-full',
            default: 'w-10 !px-2 rounded-full',
            large: 'w-12 !px-2.5 rounded-full',
        },
        none: {
            small: '',
            default: '',
            large: '',
        },
    }

    const handleMouseEnter: svelte.JSX.MouseEventHandler<
        HTMLButtonElement | HTMLAnchorElement
    > = () => {
        isHovered = true
    }

    const handleMouseLeave: svelte.JSX.MouseEventHandler<
        HTMLButtonElement | HTMLAnchorElement
    > = () => {
        isHovered = false
    }

    const handleMouseUp: svelte.JSX.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (
        event
    ) => {
        event.currentTarget.blur()
    }

    const handleKeydown: svelte.JSX.KeyboardEventHandler<HTMLButtonElement | HTMLAnchorElement> = (
        event
    ) => {
        if (event.key === 'Enter') isActive = true
    }
    const handleKeyup: svelte.JSX.KeyboardEventHandler<HTMLButtonElement | HTMLAnchorElement> = (
        event
    ) => {
        if (event.key === 'Enter') isActive = false
    }

    $: widthStyle = width && width !== 'full' ? `width: ${width * 4}px` : ''
    $: shadowClasses = shadow
        ? 'shadow-md hover:shadow-lg active:shadow-md transform hover:-translate-y-0.5 active:translate-y-0'
        : ''
    $: ringClasses =
        isActive || isHovered
            ? 'ring-offset-2 ring-offset-background'
            : 'ring-offset-2 focus:ring-2 ring-offset-background'
    $: isDisabled = typeof disabledContext !== 'undefined' ? $disabledContext || disabled : disabled
</script>

{#if href}
    <a
        class="{`
            border transition focus:outline-none font-semibold truncate
            inline-flex justify-center items-center
            ${shadowClasses}
            ${ringClasses}
            ${SIZE_MAP[size].global}
            ${SHAPE_MAP[shape][size]}
            ${
                isDisabled || loading
                    ? STYLES_MAP[variant].disabled || disabledClasses
                    : STYLES_MAP[variant].classes
            }
        `}"
        class:w-full="{width === 'full'}"
        class:rounded="{shape !== 'circle'}"
        style="{widthStyle}"
        disabled="{isDisabled || loading}"
        on:mouseenter="{handleMouseEnter}"
        on:mouseleave="{handleMouseLeave}"
        on:mouseup="{handleMouseUp}"
        on:keydown="{handleKeydown}"
        on:keyup="{handleKeyup}"
        on:click
        aria-label="{ariaLabel}"
        href="{href}"
    >
        {#if loading}
            <span class="{SIZE_MAP[size].prefix}">
                <span class="{SIZE_MAP[size].loadingSpinner}">
                    <LoadingSpinner />
                </span>
            </span>
        {:else if $$slots.prefix}
            <span class="{SIZE_MAP[size].prefix}"><slot name="prefix" /></span>
        {/if}
        {#if shape === 'none'}
            <span><slot /></span>
        {:else}
            <slot />
        {/if}
        {#if $$slots.suffix}
            <span class="{SIZE_MAP[size].suffix}"><slot name="suffix" /></span>
        {/if}
    </a>
{:else}
    <button
        class="{`
            border transition focus:outline-none font-semibold truncate
            flex justify-center items-center
            ${shadowClasses}
            ${ringClasses}
            ${SIZE_MAP[size].global}
            ${SHAPE_MAP[shape][size]}
            ${
                isDisabled || loading
                    ? STYLES_MAP[variant].disabled || disabledClasses
                    : STYLES_MAP[variant].classes
            }
        `}"
        class:w-full="{width === 'full'}"
        class:rounded="{shape !== 'circle'}"
        style="{widthStyle}"
        disabled="{isDisabled || loading}"
        type="{submit ? 'submit' : 'button'}"
        on:mouseenter="{handleMouseEnter}"
        on:mouseleave="{handleMouseLeave}"
        on:mouseup="{handleMouseUp}"
        on:keydown="{handleKeydown}"
        on:keyup="{handleKeyup}"
        on:click
        aria-label="{ariaLabel}"
    >
        {#if loading}
            <span class="{SIZE_MAP[size].prefix}">
                <span class="{SIZE_MAP[size].loadingSpinner}">
                    <LoadingSpinner />
                </span>
            </span>
        {:else if $$slots.prefix}
            <span class="{SIZE_MAP[size].prefix}"><slot name="prefix" /></span>
        {/if}
        {#if shape === 'none'}
            <span><slot /></span>
        {:else}
            <slot />
        {/if}
        {#if $$slots.suffix}
            <span class="{SIZE_MAP[size].suffix}"><slot name="suffix" /></span>
        {/if}
    </button>
{/if}
