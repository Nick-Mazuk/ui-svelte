<script lang="ts">
    export let light = false
</script>

<footer class="py-12" class:bg-gray-50="{!light}" class:border-t="{light}">
    <div class="wrapper">
        <nav class="flex flex-col sm:space-x-6 justify-between sm:flex-row">
            <slot />
        </nav>
        {#if $$slots['subfooter']}
            <div
                class="flex text-gray justify-between md:space-x-6 space-y-4 md:space-y-0 items-center mt-8 md:flex-row flex-col"
            >
                <slot name="subfooter" />
            </div>
        {/if}
    </div>
</footer>
