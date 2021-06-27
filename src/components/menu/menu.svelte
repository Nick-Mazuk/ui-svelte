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
    export let width = 0
    export let minWidth = 32

    let open: boolean
    let previousElement: Element | null

    $: if (open && typeof document !== 'undefined') previousElement = document.activeElement
    $: if (!open && typeof document !== 'undefined' && previousElement instanceof HTMLElement)
        previousElement.focus()
</script>

<Popover placement="{placement}" transitionSpeed="none" bind:open>
    <svelte:fragment slot="trigger"><slot name="button" /></svelte:fragment>
    <div
        class="shadow-lg border rounded-lg overflow-hidden bg-background"
        class:mt-2="{placement.startsWith('bottom')}"
        class:mr-2="{placement.startsWith('left')}"
        class:ml-2="{placement.startsWith('right')}"
        class:mb-2="{placement.startsWith('top')}"
        style="width: {width * 4}px; min-width: {minWidth * 4}px"
        data-test="menu"
    >
        <List
            compact="{!loose}"
            role="menu"
            autofocus
            shape="square"
            mode="singleSelect"
            ariaLabel="Menu options"
            on:change="{() => (open = false)}"
        >
            <slot />
        </List>
    </div>
</Popover>
