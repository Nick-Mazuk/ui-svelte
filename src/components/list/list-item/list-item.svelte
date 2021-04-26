<script lang="ts">
</script>

<li
    class="list-none py-2 px-4 text-gray-700 items-center flex cursor-pointer hover:bg-gray-50 hover:text-gray-900"
>
    {#if $$slots.prefix}
        <div class="w-8 flex mr-2">
            <slot name="prefix" />
        </div>
    {/if}
    <div>
        <slot />
    </div>
    {#if $$slots.suffix}
        <div class="w-10 pl-2 flex ml-auto">
            <slot name="suffix" />
        </div>
    {/if}
</li>
