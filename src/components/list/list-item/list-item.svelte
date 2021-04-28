<script lang="ts">
    import { getContext, onMount } from 'svelte'
    import type { Writable } from 'svelte/store'
    import { createEventDispatcher } from 'svelte'

    type Variant = 'primary' | 'error' | 'success' | 'warning' | 'gray' | 'highlight'

    export let href = ''
    export let variant: Variant | undefined = undefined
    let activeProp = false
    export { activeProp as active }

    let element: HTMLAnchorElement | HTMLLIElement
    let index: number = -1
    let textContent: string | null
    let dispatch = createEventDispatcher()

    const compact = getContext<boolean>('compact')
    const autofocus = getContext<boolean>('autofocusList')
    const register = getContext<(text: string | null) => number>('registerListItem')
    const focused = getContext<Writable<number>>('focusedListItem')
    const active = getContext<Writable<number>>('activeListItem')
    const listVariant = getContext<Variant>('listItemVariant')

    onMount(() => {
        textContent = element.textContent
        index = register(textContent)
        if (autofocus && index === 0) element.focus()
    })
    const handleFocus: svelte.JSX.FocusEventHandler<HTMLAnchorElement | HTMLLIElement> = () => {
        focused.set(index)
    }
    const handleClick: svelte.JSX.MouseEventHandler<HTMLAnchorElement | HTMLLIElement> = () => {
        active.set(index)
    }

    type VariantColors = {
        container: {
            active: string
        }
        affix: {
            default: string
            active: string
        }
        text: {
            default: string
            focused: string
        }
    }
    const VARIANT_MAP: Record<Variant, VariantColors> = {
        primary: {
            container: { active: '!bg-primary-200 !text-primary-700' },
            affix: { default: 'text-primary', active: 'text-primary-700' },
            text: { default: 'text-primary', focused: 'text-primary' },
        },
        error: {
            container: { active: '!bg-error-200 !text-error-700' },
            affix: { default: 'text-error', active: 'text-error-700' },
            text: { default: 'text-error', focused: 'text-error' },
        },
        success: {
            container: { active: '!bg-success-200 !text-success-700' },
            affix: { default: 'text-success', active: 'text-success-700' },
            text: { default: 'text-success', focused: 'text-success' },
        },
        warning: {
            container: { active: '!bg-warning-200 !text-warning-700' },
            affix: { default: 'text-warning', active: 'text-warning-700' },
            text: { default: 'text-warning', focused: 'text-warning' },
        },
        highlight: {
            container: { active: '!bg-highlight-200 !text-highlight-700' },
            affix: { default: 'text-highlight', active: 'text-highlight-700' },
            text: { default: 'text-highlight', focused: 'text-highlight' },
        },
        gray: {
            container: { active: '!bg-gray-200 !text-gray-700' },
            affix: { default: 'text-gray group-hover:text-gray-900', active: 'text-gray-700' },
            text: { default: 'text-gray-700 hover:text-gray-900', focused: 'text-gray-900' },
        },
    }
    $: if (activeProp) active.set(index)
    $: isFocused = $focused === index
    $: isActive = $active === index
    $: currentVariant = variant ?? listVariant ?? 'primary'
    $: classes = {
        container: [
            'list-none h-10 items-center flex cursor-pointer transition-colors group focus:outline-none hover:bg-gray-100',
            VARIANT_MAP[variant ?? 'gray'].text.default,
            compact ? 'px-3' : 'px-4',
            isFocused
                ? 'bg-gray-200 hover:bg-gray-200 ' + VARIANT_MAP[variant ?? 'gray'].text.focused
                : '',
            isActive ? VARIANT_MAP[currentVariant].container.active : '',
        ].join(' '),
        content: 'truncate',
        affix: {
            default: [
                `flex`,
                isActive
                    ? VARIANT_MAP[currentVariant].affix.active
                    : VARIANT_MAP[variant ?? 'gray'].affix.default,
            ].join(' '),
            prefix: 'w-5 mr-3',
            suffix: 'w-8 pl-3 ml-auto',
        },
    }
    let tabindex: number
    $: {
        if ($active >= 0) tabindex = index === $active ? 0 : -1
        else tabindex = index === 0 ? 0 : -1
    }
    $: {
        if ($active === index) dispatch('action')
    }
</script>

{#if href}
    <li role="none">
        <a
            href="{href}"
            sveltekit:prefetch
            class="{classes.container}"
            bind:this="{element}"
            tabindex="{tabindex}"
            on:focus="{handleFocus}"
            on:click="{handleClick}"
            aria-selected="{isActive ? true : undefined}"
            aria-current="{isFocused ? true : undefined}"
            role="option"
        >
            {#if $$slots.prefix}
                <div class="{classes.affix.default} {classes.affix.prefix}">
                    <slot name="prefix" />
                </div>
            {/if}
            <div class="{classes.content}">
                <slot />
            </div>
            {#if $$slots.suffix}
                <div class="{classes.affix.default} {classes.affix.suffix}">
                    <slot name="suffix" />
                </div>
            {/if}
        </a>
    </li>
{:else}
    <li
        class="{classes.container}"
        bind:this="{element}"
        tabindex="{tabindex}"
        on:focus="{handleFocus}"
        on:click="{handleClick}"
        aria-selected="{isActive ? true : undefined}"
        aria-current="{isFocused ? true : undefined}"
        role="option"
    >
        {#if $$slots.prefix}
            <div class="{classes.affix.default} {classes.affix.prefix}">
                <slot name="prefix" />
            </div>
        {/if}
        <div class="{classes.content}">
            <slot />
        </div>
        {#if $$slots.suffix}
            <div class="{classes.affix.default} {classes.affix.suffix}">
                <slot name="suffix" />
            </div>
        {/if}
    </li>
{/if}
