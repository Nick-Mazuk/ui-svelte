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
<path fill="currentColor" d="M64 64v288h512V64zm352 192c0 17.67-21.5 32-48 32s-48-14.33-48-32 21.5-32 48-32a69.82 69.82 0 0 1 16 2v-60.36l-96 37.52V288c0 17.67-21.5 32-48 32s-48-14.33-48-32 21.5-32 48-32a69.82 69.82 0 0 1 16 2v-98.7a16 16 0 0 1 11.19-15.3l128-47.25A16 16 0 0 1 416 112z" style="color: {VARIANT_MAP[variant].light}" class="transition-colors"></path><path fill="currentColor" d="M512 448H128a32 32 0 0 0 0 64h384a32 32 0 0 0 0-64zM592 0H48A48 48 0 0 0 0 48v320a48 48 0 0 0 48 48h544a48 48 0 0 0 48-48V48a48 48 0 0 0-48-48zm-16 352H64V64h512zm-336-32c26.5 0 48-14.33 48-32v-84.84l96-37.52V226a69.82 69.82 0 0 0-16-2c-26.5 0-48 14.33-48 32s21.5 32 48 32 48-14.33 48-32V112a16 16 0 0 0-20.81-15.25l-128 47.25A16 16 0 0 0 256 159.25V258a69.82 69.82 0 0 0-16-2c-26.5 0-48 14.33-48 32s21.5 32 48 32z" style="color: {VARIANT_MAP[variant].dark}" class="transition-colors"></path>
</svg>
