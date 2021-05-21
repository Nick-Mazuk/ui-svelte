<script lang="ts">
    import LoadingSpinner from '../loading-spinner/loading-spinner.svelte'
    import LoadingDots from '../loading-dots/loading-dots.svelte'
    import type { Writable } from 'svelte/store'
    import { getContext } from 'svelte'
    import type { FormItemGlueSide, FormItemSize } from '../../form/form-sizes'
    import { FORM_SIZE_MAP } from '../../form/form-sizes'

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
    type Shape = 'square' | 'circle' | 'none'

    export let variant: Variant = 'primary'
    export let size: FormItemSize = 'default'
    export let shadow = false
    export let disabled = false
    export let loading = false
    export let width: number | 'full' = 0
    export let shape: Shape = 'none'
    export let submit = false
    export let ariaLabel = ''
    export let href = ''
    export let testId = 'button'
    export let prefix: unknown | undefined = undefined
    export let suffix: unknown | undefined = undefined
    export let glue: FormItemGlueSide[] = []

    const disabledContext = getContext<Writable<boolean> | undefined>('disabled')

    type ButtonStyling = {
        classes: string
        disabled?: string
    }

    const disabledClasses = 'bg-gray-200 text-gray cursor-not-allowed !transition-none'
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
            classes: `bg-background text-gray-700 ${
                shadow
                    ? 'border-transparent'
                    : 'border-gray-300 hover:border-foreground dark:hover:border-gray hover:text-foreground active:bg-gray-200'
            } focus:ring-gray-900`,
            disabled: 'text-gray-300 border cursor-not-allowed !transition-none',
        },
        link: {
            classes: `border-transparent bg-transparent link ${
                shadow ? 'hover:no-underline' : ''
            } focus:ring-link`,
            disabled: 'text-gray-300 border-transparent cursor-not-allowed !transition-none',
        },
        static: {
            classes: 'border-transparent focus:ring-gray-900',
            disabled: 'text-gray-300 border-transparent cursor-not-allowed !transition-none',
        },
    }

    const loadingSpinnerClasses: Record<FormItemSize, string> = {
        small: `transform flex items-center left-0 -translate-y-1/2 absolute ${FORM_SIZE_MAP.small.affix.paddingPrefix}`,
        default: `transform flex items-center left-0 -translate-y-1/2 absolute ${FORM_SIZE_MAP.default.affix.paddingPrefix}`,
        large: `transform flex items-center left-0 -translate-y-1/2 absolute ${FORM_SIZE_MAP.large.affix.paddingPrefix}`,
    }

    const SHAPE_MAP: Record<Shape, Record<FormItemSize, string>> = {
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

    const handleMouseUp: svelte.JSX.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (
        event
    ) => {
        event.currentTarget.blur()
    }

    $: widthStyle = width && width !== 'full' ? `width: ${width * 4}px` : ''
    $: shadowClasses = shadow
        ? 'shadow-md hover:shadow-lg active:shadow-md transform hover:-translate-y-0.5 active:translate-y-0'
        : ''
    $: isDisabled = typeof disabledContext === 'undefined' ? disabled : $disabledContext || disabled
    $: sizeClasses = [
        FORM_SIZE_MAP[size].height,
        FORM_SIZE_MAP[size].textSize,
        prefix ? '' : FORM_SIZE_MAP[size].content.paddingLeft,
        suffix ? '' : FORM_SIZE_MAP[size].content.paddingRight,
    ].join(' ')
    $: glueClasses = [
        glue.includes('top') ? FORM_SIZE_MAP[size].glue.top : '',
        glue.includes('bottom') ? FORM_SIZE_MAP[size].glue.bottom : '',
        glue.includes('left') && !prefix ? FORM_SIZE_MAP[size].glue.left : '',
        glue.includes('left') && prefix ? FORM_SIZE_MAP[size].glue.leftPrefix : '',
        glue.includes('right') && !prefix ? FORM_SIZE_MAP[size].glue.right : '',
        glue.includes('right') && prefix ? FORM_SIZE_MAP[size].glue.rightPrefix : '',
    ].join(' ')

</script>

{#if href}
    <a
        class="{`
            border transition focus:outline-none font-semibold truncate
            inline-flex justify-center items-center
            focus-ring
            ${shadowClasses}
            ${sizeClasses}
            ${SHAPE_MAP[shape][size]}
            ${glueClasses}
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
        on:mouseup="{handleMouseUp}"
        on:click
        aria-label="{ariaLabel}"
        href="{href}"
        data-test="{testId}"
    >
        {#if prefix}
            <span class="{FORM_SIZE_MAP[size].affix.paddingPrefix}">
                <svelte:component this="{prefix}" size="{FORM_SIZE_MAP[size].affix.icon}" />
            </span>
        {/if}
        {#if shape === 'none'}
            <span class="relative">
                <span class="transition-opacity" class:opacity-0="{loading}">
                    <slot />
                </span>
                <span
                    class="absolute inset-0 flex items-center justify-center transition-opacity"
                    class:opacity-0="{!loading}"
                >
                    <LoadingDots />
                </span>
            </span>
        {:else}
            <slot />
        {/if}
        {#if suffix}
            <span class="{FORM_SIZE_MAP[size].affix.paddingSuffix}">
                <svelte:component this="{suffix}" size="{FORM_SIZE_MAP[size].affix.icon}" />
            </span>
        {/if}
    </a>
{:else}
    <button
        class="{`
            border transition focus:outline-none font-semibold truncate
            flex justify-center items-center
            focus-ring
            ${shadowClasses}
            ${sizeClasses}
            ${SHAPE_MAP[shape][size]}
            ${glueClasses}
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
        on:mouseup="{handleMouseUp}"
        on:click
        aria-label="{ariaLabel}"
        data-test="{testId}"
    >
        {#if prefix}
            <span class="{FORM_SIZE_MAP[size].affix.paddingPrefix}">
                <svelte:component this="{prefix}" size="{FORM_SIZE_MAP[size].affix.icon}" />
            </span>
        {/if}
        {#if shape === 'none'}
            <span class="relative">
                <span class="transition-opacity" class:opacity-0="{loading}">
                    <slot />
                </span>
                <span
                    class="absolute inset-0 flex items-center justify-center transition-opacity"
                    class:opacity-0="{!loading}"
                >
                    <LoadingDots />
                </span>
            </span>
        {:else if loading}
            <span class="relative w-full h-full">
                <span
                    class="absolute inset-0 flex items-center justify-center transition-opacity"
                    class:opacity-0="{!loading}"
                >
                    <LoadingDots />
                </span>
            </span>
        {:else}
            <slot />
        {/if}
        {#if suffix}
            <span class="{FORM_SIZE_MAP[size].affix.paddingSuffix}">
                <svelte:component this="{suffix}" size="{FORM_SIZE_MAP[size].affix.icon}" />
            </span>
        {/if}
    </button>
{/if}
