<script lang="ts">
    import Popover from '../popover/popover.svelte'

    import List from '../list/list.svelte'

    type Placement =
        | 'top'
        | 'right'
        | 'bottom'
        | 'left'
        | 'top-start'
        | 'top-end'
        | 'right-start'
        | 'right-end'
        | 'left-start'
        | 'left-end'
        | 'bottom-start'
        | 'bottom-end'

    export let loose = false
    export let placement: Placement = 'bottom-start'
</script>

<Popover placement="{placement}">
    <svelte:fragment slot="trigger"><slot name="button" /></svelte:fragment>
    <div
        class="w-64 shadow-lg border rounded-lg overflow-hidden bg-background"
        class:mt-2="{placement.startsWith('bottom')}"
        class:mr-2="{placement.startsWith('left')}"
        class:ml-2="{placement.startsWith('right')}"
        class:mb-2="{placement.startsWith('top')}"
    >
        <List compact="{!loose}" role="menu">
            <slot />
        </List>
    </div>
</Popover>
