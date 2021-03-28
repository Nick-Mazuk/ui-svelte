<script lang="ts">
    export let center = false
    export let responsive = false
    export let fullWidth = false

    $: responsiveClasses = responsive ? 'prose-sm lg:prose-lg sm:prose' : ''
    $: fullWidthClasses = fullWidth ? 'max-w-none w-full' : ''
</script>

<div
    class="prose {responsiveClasses} {fullWidthClasses}"
    class:mx-auto={center}
>
    <slot></slot>
</div>
