<script lang="ts">
    import { fade } from 'svelte/transition'

    import LoadingDots from '../../elements/loading-dots/loading-dots.svelte'
    import Search from '../../elements/icon/search.svelte'

    export let options: string[] = []
    export let isLoading = false
    export let emptyMessage = 'No results found'
    export let hideOptions = false
    export let value = ''
    export let width: number = -1

    $: widthStyle = width > 0 ? `width:${width * 4}px` : ''

    const animationDuration = 150
    let isOpen = false

    const close = () => (isOpen = false)
    const open = () => (isOpen = true)

    const handleFocus = () => resetListAndOpen()
    const handleBlur = () => close()

    const resetListAndOpen = () => {
        open()
    }

    const onItemClick = (listItem: string) => {
        value = listItem
        close()
    }
</script>

<div
    class="relative text-gray-500 hover:text-gray-700 transition-colors isolate"
    style="{widthStyle}"
>
    <div class="absolute h-full flex items-center top-0 left-2.5 pointer-events-none w-4">
        <Search />
    </div>
    <input
        type="text"
        class="bg-transparent w-full text-base rounded placeholder-gray-400 text-gray-900 border h-10 border-gray-200 hover:border-gray focus:border-primary focus:ring-primary transition-colors"
        class:pl-8="{true}"
        placeholder="Search"
        bind:value
        on:focus="{handleFocus}"
        on:blur="{handleBlur}"
        on:focus
        on:blur
        on:input
        on:change
    />
    {#if isOpen && !hideOptions}
        <div
            class="absolute shadow-xl w-full rounded overflow-hidden mt-2 text-gray-700 bg-background dark:border dark:border-gray"
            transition:fade="{{ duration: animationDuration }}"
        >
            {#if options.length > 0}
                {#each options as option}
                    {#if $$slots.option}
                        <button class="block w-full" on:focus="{() => open()}" tabindex="{-1}">
                            <slot name="option" option="{option}" />
                        </button>
                    {:else}
                        <button
                            class="px-3 py-2 hover:bg-gray-100 w-full transition-colors cursor-pointer hover:text-gray-900 block focus:outline-none text-left"
                            on:click="{() => onItemClick(option)}"
                            on:focus="{() => open()}"
                            tabindex="{-1}"
                        >
                            {option}
                        </button>
                    {/if}
                {/each}
            {:else if isLoading}
                <div class="px-3 py-2 text-center">
                    <LoadingDots text="Loading" />
                </div>
            {:else if emptyMessage}
                <div class="px-3 py-2 text-sm">
                    {emptyMessage}
                </div>
            {/if}
        </div>
    {/if}
</div>
