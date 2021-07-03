<script lang="ts">
    type Variant = 'primary' | 'gray' | 'error' | 'highlight' | 'warning' | 'success'
    export let variant: Variant = 'primary'
    let classProp = ''
    export { classProp as class }

    const VARIANT_MAP: Record<Variant, { light: string; dark: string }> = {
        primary: {
            light: 'rgb(var(--c-primary-300))',
            dark: 'rgb(var(--c-primary))',
        },
        gray: {
            light: 'rgb(var(--c-gray-300))',
            dark: 'rgb(var(--c-gray))',
        },
        error: {
            light: 'rgb(var(--c-error-300))',
            dark: 'rgb(var(--c-error))',
        },
        highlight: {
            light: 'rgb(var(--c-highlight-300))',
            dark: 'rgb(var(--c-highlight))',
        },
        warning: {
            light: 'rgb(var(--c-warning-300))',
            dark: 'rgb(var(--c-warning))',
        },
        success: {
            light: 'rgb(var(--c-success-300))',
            dark: 'rgb(var(--c-success))',
        },
    }
</script>

<svg
    aria-hidden="true"
    focusable="false"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    shape-rendering="geometricPrecision"
    class="{classProp}"
>
    <path
        fill="currentColor"
        d="M358.9 433.3l-6.8 61a15.92 15.92 0 0 0 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7zM633 268.9L595.1 231a24 24 0 0 0-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8a24.08 24.08 0 0 0 0-33.9z"
        style="color: {VARIANT_MAP[variant].light}"></path><path
        fill="currentColor"
        d="M313.6 288h-16.7a174.08 174.08 0 0 1-145.8 0h-16.7A134.43 134.43 0 0 0 0 422.4V464a48 48 0 0 0 48 48h274.9a48 48 0 0 1-2.6-21.3l6.8-60.9 1.2-11.1 85.2-85.2c-24.5-27.7-60-45.5-99.9-45.5zM224 256A128 128 0 1 0 96 128a128 128 0 0 0 128 128z"
        style="color: {VARIANT_MAP[variant].dark}"></path>
</svg>
