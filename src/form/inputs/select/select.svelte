<script lang="ts">
    import ChevronDown from '../../../elements/icon/chevron-down.svelte'
    import { createEventDispatcher } from 'svelte'
    import Label from '../../label/label.svelte'
    import type { FormItemSize } from '../../form-sizes'
    import { FORM_SIZE_MAP } from '../../form-sizes'

    export let value = ''
    export let hideArrow = false
    export let title = ''
    export let size: FormItemSize = 'default'
    export let prefix: unknown | undefined = undefined

    const dispatch = createEventDispatcher()

    const handleInput: svelte.JSX.FormEventHandler<HTMLSelectElement> = (event) => {
        event.currentTarget?.blur()
        dispatch('change', event.currentTarget.value)
    }

    $: sizeClasses = [
        FORM_SIZE_MAP[size].textSize,
        FORM_SIZE_MAP[size].height,
        prefix
            ? FORM_SIZE_MAP[size].content.paddingLeftWithPrefix
            : FORM_SIZE_MAP[size].content.paddingLeft,
        hideArrow
            ? FORM_SIZE_MAP[size].content.paddingRightWithPrefix
            : FORM_SIZE_MAP[size].content.paddingRight,
    ].join(' ')
    const affixClasses = 'absolute top-0 h-full flex items-center pointer-events-none'
</script>

<Label>
    <div class="relative text-gray-500 hover:text-gray-700">
        {#if prefix}
            <span class="{FORM_SIZE_MAP[size].affix.paddingPrefix} {affixClasses}">
                <svelte:component this="{prefix}" size="{FORM_SIZE_MAP[size].affix.icon}" />
            </span>
        {/if}
        <select
            class="w-full p-0 {sizeClasses} input-wrapper input-wrapper-active text-foreground cursor-pointer"
            on:input|self="{handleInput}"
            value="{value}"
            title="{title}"
        >
            <slot />
        </select>
        {#if !hideArrow}
            <span class="{FORM_SIZE_MAP[size].affix.paddingSuffix} {affixClasses} right-0">
                <ChevronDown size="{FORM_SIZE_MAP[size].affix.icon}" />
            </span>
        {/if}
    </div>
</Label>
