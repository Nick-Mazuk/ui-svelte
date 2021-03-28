<script lang="ts">
    export let center = false
    export let responsive = false
    export let fullWidth = false

    $: fullWidthClasses = fullWidth ? 'max-w-none w-full' : ''
</script>

<div
    class="prose {fullWidthClasses}"
    class:responsive
    class:mx-auto={center}
>
    <slot></slot>
</div>
