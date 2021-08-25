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
<path fill="currentColor" d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48zm-16 328a24 24 0 0 1-24 24H88a24 24 0 0 1-24-24V152a24 24 0 0 1 24-24h272a24 24 0 0 1 24 24z" style="color: {VARIANT_MAP[variant].light}" class="transition-colors"></path><path fill="currentColor" d="M224 320c-26.72.13-50.54-21.67-64.7-32C97.33 243 78 228.57 64 217.77V360a24 24 0 0 0 24 24h272a24 24 0 0 0 24-24V217.77c-14 10.8-33.33 25.24-95.28 70.2C275 298 250.88 320.13 224 320zm136-192H88a24 24 0 0 0-24 24v25.17c24.35 19 23.43 19.12 114.12 84.93 10.51 7.67 31.38 26.12 45.88 25.9 14.49.22 35.38-18.24 45.88-25.9 90.69-65.81 89.75-66 114.12-84.93V152a24 24 0 0 0-24-24z" style="color: {VARIANT_MAP[variant].dark}" class="transition-colors"></path>
</svg>
