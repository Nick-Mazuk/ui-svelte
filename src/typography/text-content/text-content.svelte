<script lang="ts">
    export let center = false
</script>

<div
    class="prose-sm prose lg:prose-lg sm:prose"
    class:mx-auto={center}
>
    <slot></slot>
</div>

<style>
    :global(.prose h1) {
        @apply h2;
    }
    :global(.prose h2) {
        @apply h3;
    }
    :global(.prose h3) {
        @apply h5;
    }
    :global(.prose h4) {
        @apply h6;
    }
    :global(.prose pre) {
        @apply bg-gray-50 text-gray-900 bg-opacity-70;
    }
    :global(.prose a) {
        @apply link;
    }
    :global(.prose img) {
        @apply rounded-lg;
    }
</style>
