<script lang="ts">
</script>

<div data-entity class="border rounded-lg p-4 relative">
    <slot name="check" />
    <slot name="thumbnail" />
    <div>
        <div class="flex space-x-6 items-center">
            <slot />
        </div>
        <slot name="footer" />
    </div>
</div>

<style>
    :global(div[data-entity] + div[data-entity]) {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        margin-top: -1px;
    }
    :global(div[data-entity] + div[data-entity]:before) {
        content: '';
        width: 100%;
        height: 8px;
        display: block;
        position: absolute;
        left: 0;
        top: -9px;
        background: rgb(var(--c-background));
        box-shadow: -1px 0 0 rgb(var(--c-gray-200)), 1px 0 0 rgb(var(--c-gray-200));
    }
</style>