<script lang="ts">
    import LoadingSpinner from '../../utilities/loading-spinner/loading-spinner.svelte'

    type Variant = 'filled' | 'text'
    type Color = 'primary' | 'error' | 'success' | 'warning' | 'gray' | 'highlight'
    type Size = 'small' | 'default' | 'large'
    type Shape = 'square' | 'circle' | 'none'

    export let color: Color = 'primary'
    export let variant: Variant = 'filled'
    export let size: Size = 'default'
    export let shadow = false
    export let disabled = false
    export let loading = false
    export let width: number | 'full' = 0
    export let shape: Shape = 'none'
    export let submit = false

    let isActive = false
    let isClicking = false

    type ButtonStyling = {
        enabled: Record<Color, string>
        disabled: string
    }

    const STYLES_MAP: Record<Variant, ButtonStyling> = {
        filled: {
            enabled: {
                primary:
                    'bg-primary border-primary text-white hover:bg-primary-600 hover:border-primary-600 focus:ring-primary',
                error:
                    'bg-error border-error text-white hover:bg-error-600 hover:border-error-600 focus:ring-error',
                success:
                    'bg-success border-success text-white hover:bg-success-600 hover:border-success-600 focus:ring-success',
                warning:
                    'bg-warning border-warning text-white hover:bg-warning-600 hover:border-warning-600 focus:ring-warning',
                highlight:
                    'bg-highlight border-highlight text-white hover:bg-highlight-600 hover:border-highlight-600 focus:ring-highlight',
                gray:
                    'bg-gray border-gray text-white hover:bg-gray-600 hover:border-gray-600 focus:ring-gray',
            },
            disabled: 'bg-gray-100 border-gray-100 text-gray cursor-not-allowed',
        },
        text: {
            enabled: {
                primary: `border-transparent bg-transparent text-primary ${
                    shadow ? '' : 'hover:bg-primary-50 hover:border-primary-50'
                } focus:ring-primary`,
                error: `border-transparent bg-transparent text-error ${
                    shadow ? '' : 'hover:bg-error-50 hover:border-error-50'
                } focus:ring-error`,
                success: `border-transparent bg-transparent text-success ${
                    shadow ? '' : 'hover:bg-success-50 hover:border-success-50'
                } focus:ring-success`,
                warning: `border-transparent bg-transparent text-warning ${
                    shadow ? '' : 'hover:bg-warning-50 hover:border-warning-50'
                } focus:ring-warning`,
                highlight: `border-transparent bg-transparent text-highlight ${
                    shadow ? '' : 'hover:bg-highlight-50 hover:border-highlight-50'
                } focus:ring-highlight`,
                gray: `border-transparent bg-transparent text-gray ${
                    shadow ? '' : 'hover:bg-gray-50 hover:border-gray-50'
                } focus:ring-gray`,
            },
            disabled: 'text-gray-300 dark:text-gray-d300 border-transparent cursor-not-allowed',
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
            global: 'text-sm px-3 h-8',
            loadingSpinner: 'transform scale-50 top-1/2 mt-0.5 -translate-y-1/2 absolute',
            prefix: 'flex w-4 mr-2 -ml-1 relative',
            suffix: 'flex w-4 ml-1 -mr-1',
        },
        default: {
            global: 'text-sm px-4 h-10',
            loadingSpinner: 'transform scale-75 top-1/2 mt-0.5 -translate-y-1/2 absolute',
            prefix: 'flex w-5 mr-2 -ml-1 relative',
            suffix: 'flex w-5 ml-2 -mr-1',
        },
        large: {
            global: 'px-4 h-12',
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

    const handleMouseDown: svelte.JSX.MouseEventHandler<HTMLButtonElement> = () => {
        isClicking = true
    }

    const handleMouseUp: svelte.JSX.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.currentTarget.blur()
        isClicking = false
    }

    const handleKeydown: svelte.JSX.KeyboardEventHandler<HTMLButtonElement> = (event) => {
        if (event.key === 'Enter') isActive = true
    }
    const handleKeyup: svelte.JSX.KeyboardEventHandler<HTMLButtonElement> = (event) => {
        if (event.key === 'Enter') isActive = false
    }

    $: widthStyle = width && width !== 'full' ? `width: ${width * 4}px` : ''
    $: shadowClasses = shadow
        ? 'shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0'
        : ''
    $: ringClasses =
        isActive || isClicking
            ? 'ring-offset-2 ring-0 ring-offset-white'
            : 'ring-offset-2 focus:ring-2 ring-offset-white'
</script>

<button
    class="{`
        border transition focus:outline-none text-semibold truncate
        flex justify-center items-center
        ${shadowClasses}
        ${ringClasses}
        ${SIZE_MAP[size].global}
        ${SHAPE_MAP[shape][size]}
        ${disabled || loading ? STYLES_MAP[variant].disabled : STYLES_MAP[variant].enabled[color]}
    `}"
    class:w-full="{width === 'full'}"
    class:rounded="{shape !== 'circle'}"
    style="{widthStyle}"
    disabled="{disabled || loading}"
    type="{submit ? 'submit' : 'button'}"
    on:mousedown="{handleMouseDown}"
    on:mouseup="{handleMouseUp}"
    on:keydown="{handleKeydown}"
    on:keyup="{handleKeyup}"
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
