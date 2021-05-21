<script lang="ts">
    import ChevronDown from '../../../elements/icon/chevron-down.svelte'
    import { createEventDispatcher, getContext } from 'svelte'
    import Label from '../../label/label.svelte'
    import type { FormItemSize } from '../../form-sizes'
    import { FORM_SIZE_MAP } from '../../form-sizes'
    import Error from '../../../elements/error/error.svelte'
    import type { FormSync } from '../..'
    import { slugify } from '@nick-mazuk/lib/esm/text-styling'

    export let label = ''
    let nameProp = ''
    export { nameProp as name }
    export let ariaLabel = ''
    export let optional = false
    export let hideOptionalLabel = false
    export let readonly = false
    export let disabled = false
    export let requiredMessage = 'Select a value'
    export let defaultValue = ''
    export let hideArrow = false
    export let size: FormItemSize = 'default'
    export let prefix: unknown | undefined = undefined

    const dispatch = createEventDispatcher()
    const formSync = getContext<FormSync>('formSync')

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
            ? FORM_SIZE_MAP[size].content.paddingRight
            : FORM_SIZE_MAP[size].content.paddingRightWithPrefix,
    ].join(' ')
    const affixClasses = 'absolute top-0 h-full flex items-center pointer-events-none'

    $: name = nameProp ? nameProp : slugify(label)
    $: value = defaultValue
    $: isValid = optional || value !== ''
    let showError = false
    const reset = () => {
        showError = false
        value = defaultValue
    }
    $: if (formSync) {
        formSync.updateForm(
            name,
            value,
            () => {
                showError = true
                return isValid
            },
            reset
        )
    }
    $: isInvalidState = showError && !isValid

</script>

<Label
    value="{label}"
    optional="{optional}"
    hideOptionalLabel="{hideOptionalLabel}"
    readonly="{readonly}"
>
    <div class="relative text-gray-500 hover:text-gray-700">
        {#if prefix}
            <span class="{FORM_SIZE_MAP[size].affix.paddingPrefix} {affixClasses}">
                <svelte:component this="{prefix}" size="{FORM_SIZE_MAP[size].affix.icon}" />
            </span>
        {/if}
        <select
            class="w-full p-0 {sizeClasses} input-wrapper text-foreground cursor-pointer"
            class:input-wrapper-readonly="{readonly}"
            class:input-wrapper-disabled="{disabled}"
            class:input-wrapper-active="{!disabled && !readonly && !isInvalidState}"
            class:input-wrapper-error="{isInvalidState}"
            on:input|self="{handleInput}"
            bind:value
            title="{ariaLabel || label || name}"
            name="{name}"
            disabled="{disabled}"
            aria-invalid="{isInvalidState}"
            readonly="{readonly}"
        >
            <slot />
        </select>
        {#if !hideArrow}
            <span class="{FORM_SIZE_MAP[size].affix.paddingSuffix} {affixClasses} right-0">
                <ChevronDown size="{FORM_SIZE_MAP[size].affix.icon}" />
            </span>
        {/if}
    </div>
    {#if isInvalidState && requiredMessage}
        <Error label="">{requiredMessage}</Error>
    {/if}
</Label>
