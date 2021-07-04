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
    viewBox="0 0 448 513"
    shape-rendering="geometricPrecision"
    class="{classProp}"
>
<path fill="currentColor" d="M352,96L352,0L152,0C138.834,0 128,10.834 128,24L128,392C128,405.166 138.834,416 152,416L424,416C437.166,416 448,405.166 448,392L448,96L352,96Z" style="color: {VARIANT_MAP[variant].light}"></path><path fill="currentColor" d="M96,392L96,96L24,96C10.834,96 0,106.834 0,120L0,488C0,501.166 10.834,512 24,512L296,512C309.166,512 320,501.166 320,488L320,448L152,448C121.292,447.967 96.033,422.708 96,392ZM371.416,288L202.659,288C196.047,288 190.605,293.417 190.605,300L190.605,308C190.605,314.583 196.047,320 202.659,320L371.416,320C378.028,320 383.47,314.583 383.47,308L383.47,300C383.47,293.417 378.028,288 371.416,288ZM371.416,224L202.659,224C196.047,224 190.605,229.417 190.605,236L190.605,244C190.605,250.583 196.047,256 202.659,256L371.416,256C378.028,256 383.47,250.583 383.47,244L383.47,236C383.47,229.417 378.028,224 371.416,224ZM371.416,160L202.659,160C196.047,160 190.605,165.417 190.605,172L190.605,180C190.605,186.583 196.047,192 202.659,192L371.416,192C378.028,192 383.47,186.583 383.47,180L383.47,172C383.47,165.417 378.028,160 371.416,160ZM441,73L375,7C370.489,2.505 364.369,-0.016 358,0L352,0L352,96L448,96L448,89.94C448,83.592 445.481,77.497 441,73Z" style="color: {VARIANT_MAP[variant].dark}"></path>
</svg>
