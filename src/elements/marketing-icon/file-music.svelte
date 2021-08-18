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
    viewBox="0 0 384 512"
    shape-rendering="geometricPrecision"
    class="{classProp}"
>
<path fill="currentColor" d="M377 105L279.09 7a24 24 0 0 0-17-7H256v128h128v-6.09a23.91 23.91 0 0 0-7-16.91zm-153 31V0H24A23.94 23.94 0 0 0 0 24v464a23.94 23.94 0 0 0 24 24h336a23.94 23.94 0 0 0 24-24V160H248a24.08 24.08 0 0 1-24-24zm64 88v160c0 17.67-21.5 32-48 32s-48-14.33-48-32 21.5-32 48-32a69.82 69.82 0 0 1 16 2v-76.36l-96 37.52V416c0 17.67-21.5 32-48 32s-48-14.33-48-32 21.5-32 48-32a69.82 69.82 0 0 1 16 2V271.25A16 16 0 0 1 139.19 256l128-47.25A16 16 0 0 1 288 224z" style="color: {VARIANT_MAP[variant].light}"></path><path fill="currentColor" d="M288 224v160c0 17.67-21.5 32-48 32s-48-14.33-48-32 21.5-32 48-32a69.82 69.82 0 0 1 16 2v-76.36l-96 37.52V416c0 17.67-21.5 32-48 32s-48-14.33-48-32 21.5-32 48-32a69.82 69.82 0 0 1 16 2V271.25A16 16 0 0 1 139.19 256l128-47.25A16 16 0 0 1 288 224z" style="color: {VARIANT_MAP[variant].dark}"></path>
</svg>
