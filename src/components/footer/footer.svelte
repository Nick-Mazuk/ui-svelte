<script lang="ts">
    export let light = false
</script>

<footer class="py-12 mt-auto" class:bg-gray-100="{!light}" class:border-t="{light}">
    <div class="wrapper flex space-y-8 flex-col">
        {#if $$slots.default}
            <nav class="flex flex-col sm:space-x-6 justify-between sm:flex-row">
                <slot />
            </nav>
        {/if}
        {#if $$slots.subfooter}
            <div
                class="flex text-gray justify-between md:space-x-6 space-y-4 md:space-y-0 items-center md:flex-row flex-col"
            >
                <slot name="subfooter" />
            </div>
        {/if}
    </div>
</footer>
