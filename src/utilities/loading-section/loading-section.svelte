<script lang="ts">
    import LoadingSpinner from '../loading-spinner/loading-spinner.svelte'
    type Size = 'small' | 'default' | 'large'
    export let size = 'default'

    const SIZE_MAP: Record<Size, string> = {
        small: 'py-16',
        default: 'py-32',
        large: 'py-48'
    }
</script>

<section class='flex items-center justify-around {SIZE_MAP[size]}'>
    <LoadingSpinner/>
</section>