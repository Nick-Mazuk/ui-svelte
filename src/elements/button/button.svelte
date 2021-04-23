<script lang="ts">
    type Variant = 'filled' | 'text'
    type Color = 'primary' | 'error' | 'success' | 'warning' | 'gray' | 'highlight'
    type Size = 'small' | 'default' | 'large'
    type Shape = 'square' | 'circle' | 'none'

    export let color: Color = 'primary'
    export let variant: Variant = 'filled'
    export let size: Size = 'default'
    export let shadow = false
    export let disabled = false
    export let width: number | 'full' = 0
    export let shape: Shape = 'none'

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
                primary: '',
                error: '',
                success: '',
                warning: '',
                highlight: '',
                gray: '',
            },
            disabled: 'text-gray-300 dark:text-gray-d300',
        },
    }

    const SIZE_MAP: Record<Size, string> = {
        small: 'text-sm px-3 py-1',
        default: 'text-sm px-4 py-2',
        large: 'px-4 py-3',
    }

    const SHAPE_MAP: Record<Shape, Record<Size, string>> = {
        square: {
            small: 'w-[30px]',
            default: 'w-[38px]',
            large: 'w-[48px]',
        },
        circle: {
            small: 'w-[30px] rounded-full',
            default: 'w-[38px] rounded-full',
            large: 'w-[48px] rounded-full',
        },
        none: {
            small: '',
            default: '',
            large: '',
        },
    }

    const handleMouseDown: svelte.JSX.MouseEventHandler<HTMLButtonElement> = (event) => {
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

    $: style = width && width !== 'full' ? `width: ${width * 4}px` : ''
    $: shadowClasses = shadow
        ? 'shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0'
        : ''
    $: ringClasses = isActive || isClicking ? 'ring-offset-2 ring-0' : 'ring-offset-2 focus:ring-2'
</script>

<button
    class="{`
        border transition focus:outline-none text-semibold truncate
        ${shadowClasses}
        ${ringClasses}
        ${SIZE_MAP[size]}
        ${SHAPE_MAP[shape][size]}
        ${disabled ? STYLES_MAP[variant].disabled : STYLES_MAP[variant].enabled[color]}
    `}"
    class:w-full="{width === 'full'}"
    class:rounded="{shape !== 'circle'}"
    style="{style}"
    on:mousedown="{handleMouseDown}"
    on:mouseup="{handleMouseUp}"
    on:keydown="{handleKeydown}"
    on:keyup="{handleKeyup}"
>
    <slot />
</button>
