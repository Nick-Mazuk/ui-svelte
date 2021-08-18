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
    viewBox="0 0 512 512"
    shape-rendering="geometricPrecision"
    class="{classProp}"
>
<path fill="currentColor" d="M369 112H145a112 112 0 0 1 224 0z" style="color: {VARIANT_MAP[variant].light}"></path><path fill="currentColor" d="M512 288.9c-.48 17.43-15.22 31.1-32.66 31.1H424v16a143.4 143.4 0 0 1-13.6 61.14l60.23 60.23a32 32 0 0 1-45.26 45.26l-54.73-54.74A143.42 143.42 0 0 1 280 480V236a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v244a143.42 143.42 0 0 1-90.64-32.11l-54.73 54.74a32 32 0 0 1-45.26-45.26l60.23-60.23A143.4 143.4 0 0 1 88 336v-16H32.67C15.23 320 .49 306.33 0 288.9A32 32 0 0 1 32 256h56v-58.74l-46.63-46.63a32 32 0 0 1 45.26-45.26L141.25 160h229.49l54.63-54.63a32 32 0 0 1 45.26 45.26L424 197.26V256h56a32 32 0 0 1 32 32.9z" style="color: {VARIANT_MAP[variant].dark}"></path>
</svg>
