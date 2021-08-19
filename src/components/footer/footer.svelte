<script lang="ts">
    export let light = false

    let roughHeight = 96
    if ($$slots.default) roughHeight += 150
    if ($$slots.subfooter) roughHeight += 36
    if ($$slots.default && $$slots.subfooter) roughHeight += 32
</script>

<footer
    class="py-12 mt-auto"
    class:bg-gray-100="{!light}"
    class:border-t="{light}"
    style="content-visibility: auto; content-intrinsic-size: 1px {roughHeight}px"
>
    <div class="wrapper flex space-y-8 flex-col">
        {#if $$slots.default}
            <nav class="flex flex-col md:space-x-6 justify-between md:flex-row">
                <slot />
            </nav>
        {/if}
        {#if $$slots.subfooter}
            <div
                class="flex text-gray-600 justify-between md:space-x-6 space-y-4 md:space-y-0 items-center md:flex-row flex-col"
            >
                <slot name="subfooter" />
            </div>
        {/if}
    </div>
</footer>
