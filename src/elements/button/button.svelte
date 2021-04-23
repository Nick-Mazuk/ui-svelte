<script lang="ts">
    type Style = 'filled' | 'text'
    type Size = 'small' | 'default' | 'large'
    type GluePosition = 'left' | 'right' | 'top' | 'bottom'
    type IconPosition = 'before' | 'after'
    type Color = 'primary' | 'error' | 'success' | 'warning' | 'gray' | 'highlight' | 'white'

    export let value: string
    export let style: Style = 'filled'
    export let href: string = ''
    export let onClick: (() => void) | undefined = undefined
    export let size: Size = 'default'
    export let fullWidth = false
    export let glue: GluePosition[] = []
    export let color: Color = 'gray'
    export let download = false
    export let disabled = false
    export let loading = false

    type ButtonStyling = {
        global: string
        enabled: Record<Color, string>
        disabled: string
    }

    const STYLES_MAP: Record<Style, ButtonStyling> = {
        filled: {
            global: '',
            enabled: {
                primary:
                    'text-white bg-primary hover:bg-primary-600 hover:scale-101 focus:bg-primary-600 dark:text-black dark:bg-primary-d dark:hover:bg-primary-d600 dark:hover:scale-101 dark:focus:bg-primary-d600',
                error:
                    'text-white bg-error hover:bg-error-600 hover:scale-101 focus:bg-error-600 dark:text-black dark:bg-error-d dark:hover:bg-error-d600 dark:hover:scale-101 dark:focus:bg-error-d600',
                success:
                    'text-white bg-success hover:bg-success-600 hover:scale-101 focus:bg-success-600 dark:text-black dark:bg-success-d dark:hover:bg-success-d600 dark:hover:scale-101 dark:focus:bg-success-d600',
                warning:
                    'text-warning-800 bg-warning-200 hover:bg-warning-300 hover:scale-101 focus:bg-warning-300 dark:text-black dark:bg-warning-d600 dark:hover:bg-warning-d700 dark:hover:scale-101 dark:focus:bg-warning-d700',
                highlight:
                    'text-white bg-highlight hover:bg-highlight-600 hover:scale-101 focus:bg-highlight-600 dark:text-black dark:bg-highlight-d dark:hover:bg-highlight-d600 dark:hover:scale-101 dark:focus:bg-highlight-d600',
                white:
                    'text-gray-900 bg-white hover:bg-gray-50 hover:scale-101 focus:bg-gray-50 dark:text-gray-d900 dark:bg-gray-d50 dark:hover:bg-gray-d50 dark:hover:scale-101 dark:focus:bg-gray-d50',
                gray:
                    'text-white bg-gray-800 hover:bg-gray-900 hover:scale-101 focus:bg-gray-900 dark:text-black dark:bg-gray-d800 dark:hover:bg-gray-d900 dark:hover:scale-101 dark:focus:bg-gray-d900',
            },
            disabled: 'bg-gray-100 text-gray-600 dark:bg-gray-d100 dark:text-gray-d600',
        },
        text: {
            global: '',
            enabled: {
                primary:
                    'bg-transparent text-primary hover:text-primary-600 hover:bg-primary-50 focus:text-primary-600 focus:bg-primary-50 dark:text-primary-d dark:hover:text-primary-d600 dark:hover:bg-primary-d50 dark:focus:text-primary-d600 dark:focus:bg-primary-d50',
                error:
                    'bg-transparent text-error hover:text-error-600 hover:bg-error-50 focus:text-error-600 focus:bg-error-50 dark:text-error-d dark:hover:text-error-d600 dark:hover:bg-error-d50 dark:focus:text-error-d600 dark:focus:bg-error-d50',
                success:
                    'bg-transparent text-success hover:text-success-600 hover:bg-success-50 focus:text-success-600 focus:bg-success-50 dark:text-success-d dark:hover:text-success-d600 dark:hover:bg-success-d50 dark:focus:text-success-d600 dark:focus:bg-success-d50',
                warning:
                    'bg-transparent text-warning hover:text-warning-600 hover:bg-warning-50 focus:text-warning-600 focus:bg-warning-50 dark:text-warning-d dark:hover:text-warning-d600 dark:hover:bg-warning-d50 dark:focus:text-warning-d600 dark:focus:bg-warning-d50',
                highlight:
                    'bg-transparent text-highlight hover:text-highlight-600 hover:bg-highlight-50 focus:text-highlight-600 focus:bg-highlight-50 dark:text-highlight-d dark:hover:text-highlight-d600 dark:hover:bg-highlight-d50 dark:focus:text-highlight-d600 dark:focus:bg-highlight-d50',
                white:
                    'bg-white bg-opacity-0 text-white hover:bg-opacity-20 focus:bg-opacity-20 dark:text-gray-d900 dark:hover:bg-gray-d50 dark:focus:bg-gray-d50',
                gray:
                    'bg-transparent text-gray hover:text-gray-600 hover:bg-gray-50 focus:text-gray-600 focus:bg-gray-50 dark:text-gray-d dark:hover:text-gray-d600 dark:hover:bg-gray-d50 dark:focus:text-gray-d600 dark:focus:bg-gray-d50',
            },
            disabled: 'text-gray-300 dark:text-gray-d300',
        },
    }
</script>

<button></button>
