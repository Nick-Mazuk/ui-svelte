<script lang="ts">
    import { getContext, onMount } from 'svelte'
    import type { Writable } from 'svelte/store'

    export let active = false
    export let href: string | undefined = undefined

    type TabsContext = {
        disabledStore: Writable<boolean>
        activeStore: Writable<number>
        focusStore: Writable<number>
        register: (text: string | null) => number
    }
    let tabElement: HTMLButtonElement | HTMLAnchorElement

    const { disabledStore, register, activeStore, focusStore } = getContext<TabsContext>('tabs')
    let index = -1
    onMount(() => {
        index = register(tabElement.textContent)
    })

    let mouseIsDown = false
    const handleClick: svelte.JSX.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = () =>
        activeStore.set(index)
    const handleFocus: svelte.JSX.FocusEventHandler<HTMLButtonElement | HTMLAnchorElement> = () => {
        if (!mouseIsDown) focusStore.set(index)
    }

    $: disabledClasses = $disabledStore ? 'cursor-default' : 'hover:text-foreground'
    let tabIndex: number | undefined
    $: {
        if ($disabledStore) tabIndex = -1
        else if ($activeStore === index) tabIndex = 0
        else tabIndex = -1
    }
    $: if (active) activeStore.set(index)
    $: isActive = $activeStore === index
    $: isFocused = $focusStore === index
    $: if ($focusStore === index) tabElement?.focus()
</script>

{#if href}
    <a
        role="tab"
        class="focus:outline-none h-8 relative flex-none items-center border-b-2 text-lg transition-colors flex space-x-2 group {disabledClasses}"
        class:text-gray-700="{!isActive}"
        class:border-transparent="{!isActive}"
        class:border-foreground="{isActive}"
        class:font-bold="{isFocused}"
        disabled="{$disabledStore}"
        aria-disabled="{$disabledStore}"
        tabindex="{tabIndex}"
        bind:this="{tabElement}"
        data-test="tab-item"
        aria-selected="{isActive}"
        on:click="{handleClick}"
        on:focus="{handleFocus}"
        on:mousedown="{() => (mouseIsDown = true)}"
        on:mouseup="{() => (mouseIsDown = false)}"
        on:mouseout="{() => (mouseIsDown = false)}"
        href="{href}"
        sveltekit:prefetch
    >
        {#if $$slots.icon}
            <span
                class="w-4 flex transition-colors {$disabledStore
                    ? ''
                    : 'group-hover:text-foreground'}"
                class:text-foreground="{isActive}"
                class:text-gray="{!isActive}"
            >
                <slot name="icon" />
            </span>
        {/if}
        <span><slot /></span>
    </a>
{:else}
    <button
        role="tab"
        class="focus:outline-none h-8 relative flex-none items-center border-b-2 text-lg transition-colors flex space-x-2 group {disabledClasses}"
        class:text-gray-700="{!isActive}"
        class:border-transparent="{!isActive}"
        class:border-foreground="{isActive}"
        class:font-bold="{isFocused}"
        disabled="{$disabledStore}"
        aria-disabled="{$disabledStore}"
        tabindex="{tabIndex}"
        bind:this="{tabElement}"
        data-test="tab-item"
        aria-selected="{isActive}"
        on:click="{handleClick}"
        on:focus="{handleFocus}"
        on:mousedown="{() => (mouseIsDown = true)}"
        on:mouseup="{() => (mouseIsDown = false)}"
        on:mouseout="{() => (mouseIsDown = false)}"
    >
        {#if $$slots.icon}
            <span
                class="w-4 flex transition-colors {$disabledStore
                    ? ''
                    : 'group-hover:text-foreground'}"
                class:text-foreground="{isActive}"
                class:text-gray="{!isActive}"
            >
                <slot name="icon" />
            </span>
        {/if}
        <span><slot /></span>
    </button>
{/if}
