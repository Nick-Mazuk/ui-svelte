<script lang="ts">
    import Button from '../../elements/button/button.svelte'
    import MoreVertical from '../../elements/icon/more-vertical.svelte'

    import Container from '../../utilities/container/container.svelte'

    export let disabled = false

    $: gridStyle = $$slots.prefix ? 'grid-template-columns: auto minmax(0, 1fr)' : ''
</script>

<Container
    padding="small"
    class="entity relative !overflow-visible {disabled ? 'disabled-entity' : ''}"
    variant="{disabled ? 'disable' : undefined}"
>
    <div class="grid gap-x-4" style="{gridStyle}">
        {#if $$slots.prefix}
            <div class="place-self-center">
                <slot name="prefix" />
            </div>
        {/if}

        <div class="flex space-x-6 items-center">
            <slot />
            {#if $$slots.actions}
                <div class="flex space-x-3"><slot name="actions" /></div>
            {/if}
            {#if $$slots.menu}
                <div>
                    <slot name="menu" />
                    <Button shape="square" size="small" variant="static">
                        <MoreVertical />
                    </Button>
                </div>
            {/if}
        </div>
        {#if $$slots.footer}
            <div
                class="border-t mt-4 pt-4 row-start-2 text-gray"
                class:col-start-2="{$$slots.prefix}"
            >
                <slot name="footer" />
            </div>
        {/if}
    </div>
</Container>

<style>
    :global(.entity + .entity) {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        margin-top: -1px;
    }
    :global(.entity + .entity:before) {
        content: '';
        width: 100%;
        height: 8px;
        display: block;
        position: absolute;
        left: 0;
        top: -9px;
        background: rgb(var(--c-background));
        pointer-events: none;
        box-shadow: -1px 0 0 rgb(var(--c-gray-100)), 1px 0 0 rgb(var(--c-gray-100));
    }
    :global(.entity.disabled-entity + .entity:before) {
        background: rgb(var(--c-gray-50));
    }
</style>
