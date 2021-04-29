<script lang="ts">
    import ChevronDown from '../../../elements/icon/chevron-down.svelte'

    import Button from '../../../elements/button/button.svelte'

    export let title: string

    let open = false
</script>

<div class="border-b md:border-none">
    <h3 class="hidden font-bold text-gray md:block">{title}</h3>
    <div
        class="flex items-center h-10 justify-between cursor-pointer md:hidden"
        on:click="{() => (open = !open)}"
    >
        <h3>{title}</h3>
        <Button
            shape="square"
            variant="static"
            size="small"
            ariaLabel="Open navigation menu for {title}"
        >
            <div class="transform transition-transform" class:rotate-180="{open}">
                <ChevronDown size="{4}" />
            </div>
        </Button>
    </div>
    <ul class="md:block" class:hidden="{!open}">
        <slot />
    </ul>
</div>
