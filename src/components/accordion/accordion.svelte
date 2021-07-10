<script lang="ts">
    import ChevronDown from '../../elements/icon/chevron-down.svelte'

    export let title: string
    export let unstyledContents = false

    let content: HTMLDivElement
    let isExpanded = false
    let contentClasses = unstyledContents ? '' : 'prose !max-w-full'
</script>

<details bind:open="{isExpanded}">
    <summary
        class="py-6 flex items-center w-full justify-between cursor-pointer focus:outline-none"
    >
        <span class="h5">{title}</span>
        <span class="transition-transform transform -mx-2" class:rotate-180="{isExpanded}">
            <ChevronDown />
        </span>
    </summary>
    <div bind:this="{content}" class="{contentClasses}">
        <slot />
    </div>
</details>
