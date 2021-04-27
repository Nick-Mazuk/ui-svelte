<script lang="ts">
    import Button from '../../elements/button/button.svelte'
    import MoreVertical from '../../elements/icon/more-vertical.svelte'

    import Container from '../../utilities/container/container.svelte'
    import Menu from '../menu/menu.svelte'

    export let disabled = false
    export let wrapPrefix = false

    let mobileColumnCount: number
    let firstFieldOffset: number
    let firstEntityRow: number
    let mobileColumns: string[]
    $: {
        mobileColumnCount = 1
        firstFieldOffset = 1
        firstEntityRow = 1
        mobileColumns = ['auto']
        if ($$slots.prefix && !wrapPrefix) {
            mobileColumnCount++
            firstFieldOffset = 2
            mobileColumns.push('minmax(0, 1fr)')
        }
        if ($$slots.actions || $$slots.menu) {
            mobileColumnCount++
            mobileColumns.push('auto')
        }
        if (wrapPrefix && $$slots.prefix) firstEntityRow = 2
    }
</script>

<Container
    padding="small"
    class="entity relative !overflow-visible {disabled ? 'disabled-entity' : ''}"
    variant="{disabled ? 'disable' : undefined}"
>
    <div
        class="grid gap-x-4"
        class:has-prefix="{$$slots.prefix}"
        style="--entity-columns: {mobileColumns.join(
            ' '
        )};--entity-column-count: {mobileColumnCount}; --first-entity-field-offset: {firstFieldOffset}; --first-entity-row: {firstEntityRow}"
    >
        {#if $$slots.prefix}
            <div class="place-self-center hidden sm:block">
                <slot name="prefix" />
            </div>
        {/if}

        <div
            class="grid grid-flow-cols gap-4 sm:flex sm:space-x-6 sm:gap-0 sm:flex-row sm:items-center"
            data-component="entity-slot-container"
        >
            <slot />
            {#if $$slots.prefix}
                <div class="col-start-1 row-start-1 sm:hidden">
                    <slot name="prefix" />
                </div>
            {/if}
            {#if $$slots.actions || $$slots.menu}
                <div class="flex space-x-2 row-start-1 justify-end">
                    {#if $$slots.actions}
                        <div class="flex space-x-3"><slot name="actions" /></div>
                    {/if}
                    {#if $$slots.menu}
                        <div>
                            <Menu placement="left-start">
                                <Button shape="square" size="small" variant="static" slot="button">
                                    <MoreVertical />
                                </Button>
                                <slot name="menu" />
                            </Menu>
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
        {#if $$slots.footer}
            <div
                class="border-t col-start-1 mt-4 pt-4 sm:row-start-2 text-gray"
                class:sm:col-start-2="{$$slots.prefix}"
            >
                <slot name="footer" />
            </div>
        {/if}
    </div>
</Container>

<style>
    @media (min-width: 640px) {
        .has-prefix {
            grid-template-columns: auto minmax(0, 1fr);
        }
    }

    @media (max-width: 640px) {
        :global([data-component='entity-slot-container']) {
            grid-template-columns: var(--entity-columns);
        }
        :global([data-component='entity-field']) {
            grid-column: span var(--entity-column-count) / span var(--entity-column-count);
            grid-column-start: 1;
        }
        :global([data-component='entity-field']:first-of-type) {
            grid-row-start: var(--first-entity-row);
            grid-column-start: var(--first-entity-field-offset);
            grid-column: span 1 / span 1;
        }
    }

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
