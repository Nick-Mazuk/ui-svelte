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
<path fill="currentColor" d="M528 0H112a48.14 48.14 0 0 0-48 48v336h512V48a48.14 48.14 0 0 0-48-48zm-16 320H128V64h384z" style="color: {VARIANT_MAP[variant].light}"></path><path fill="currentColor" d="M624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33-17.47-32.77-32H16a16 16 0 0 0-16 16v16a64.19 64.19 0 0 0 64 64h512a64.19 64.19 0 0 0 64-64v-16a16 16 0 0 0-16-16zM512 64H128v256h384zM289 250.34l-11.31 11.31a16 16 0 0 1-22.63 0l-58.35-58.34a16 16 0 0 1 0-22.63L255 122.34a16 16 0 0 1 22.63 0L289 133.65a16 16 0 0 1 0 22.63L253.25 192 289 227.71a16 16 0 0 1 0 22.63zm154.35-47L385 261.66a16 16 0 0 1-22.63 0L351 250.35a16 16 0 0 1 0-22.63L386.75 192 351 156.29a16 16 0 0 1 0-22.63l11.31-11.31a16 16 0 0 1 22.63 0l58.34 58.34a16 16 0 0 1 .04 22.63z" style="color: {VARIANT_MAP[variant].dark}"></path>
</svg>
