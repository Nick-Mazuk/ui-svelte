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
<path fill="currentColor" d="M320 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3a19.37 19.37 0 0 1-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24a23.94 23.94 0 0 1 24-24h80a23.94 23.94 0 0 1 24 24z" style="color: {VARIANT_MAP[variant].light}"></path><path fill="currentColor" d="M488 352H341.3l-49 49a51.24 51.24 0 0 1-72.6 0l-49-49H24a23.94 23.94 0 0 0-24 24v112a23.94 23.94 0 0 0 24 24h464a23.94 23.94 0 0 0 24-24V376a23.94 23.94 0 0 0-24-24zm-120 96a16 16 0 1 1 16-16 16 16 0 0 1-16 16zm64 0a16 16 0 1 1 16-16 16 16 0 0 1-16 16z" style="color: {VARIANT_MAP[variant].dark}"></path>
</svg>
