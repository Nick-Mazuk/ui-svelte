<script lang="ts">
    import { getContext } from 'svelte'
    import type { Writable } from 'svelte/store'

    import Label from '../../label/label.svelte'
    import type { FormSync } from '../..'
    import type { CheckboxValue } from '.'
    import Error from '../../../elements/error/error.svelte'

    export let defaultValue: CheckboxValue = 'unchecked'
    export let ariaLabel: string | undefined = undefined
    export let label: string | undefined = undefined
    let inputedName: string = ''
    export { inputedName as name }
    export let disabled = false
    export let optional = false
    export let hideOptionalLabel = false
    export let hideError = false
    export let requiredMessage: string = 'This is required'

    const labelValue = getContext<Writable<string> | undefined>('label')
    const formSync = getContext<FormSync>('formSync')
    let checkElement: HTMLInputElement | undefined
    let showError = false
    let isValid = false
    let isHovered = false
    let isFocused = false
    let value: CheckboxValue = defaultValue

    let justClicked = false
    const handleChange: svelte.JSX.FormEventHandler<HTMLInputElement> = (event) => {
        value = event.currentTarget.checked ? 'checked' : 'unchecked'
        if (justClicked) {
            event.currentTarget.blur()
            justClicked = false
        }
        showError = true
    }
    const handleMouseUp = () => (justClicked = true)
    const reset = () => {
        value = defaultValue
        showError = false
    }
    const handleMouseEnter = () => (isHovered = true)
    const handleMouseLeave = () => (isHovered = false)
    const handleFocusIn = () => (isFocused = true)
    const handleFocusOut = () => (isFocused = false)

    $: borderClasses = value === 'unchecked' && !disabled ? 'group-hover:border-foreground' : ''
    let name = ''
    $: {
        if (inputedName) name = inputedName
        else if (labelValue) name = $labelValue
        else name = ''
    }
    $: if (formSync)
        formSync.updateForm(
            name,
            value,
            () => {
                showError = true
                return isValid
            },
            reset
        )
    $: {
        if (optional) {
            isValid = true
        } else {
            if (value !== 'checked') isValid = false
            else isValid = true
        }
    }
</script>

<Label value="{label}" on:mouseup="{handleMouseUp}">
    <div class="inline-flex space-x-4" class:cursor-not-allowed="{disabled}">
        <span class="flex-none self-start flex items-center">
            <span>&ZeroWidthSpace;</span>
            <div
                class="h-10 w-10 relative -m-3 flex items-center justify-center {disabled
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'}"
                on:mouseenter="{handleMouseEnter}"
                on:mouseleave="{handleMouseLeave}"
                on:focusin="{handleFocusIn}"
                on:focusout="{handleFocusOut}"
            >
                <div
                    class="absolute rounded-full h-8 w-8 transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 transition-opacity"
                    class:bg-gray="{value === 'unchecked'}"
                    class:bg-primary="{value !== 'unchecked'}"
                    class:hidden="{disabled}"
                    class:opacity-0="{!isHovered && !isFocused}"
                    class:opacity-10="{isHovered && !isFocused}"
                    class:opacity-20="{isFocused}"
                ></div>
                <input
                    type="checkbox"
                    class="relative rounded-sm w-4 h-4 bg-transparent cursor-pointer focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed checked:text-primary transition focus:outline-none disabled:text-gray-300 disabled:border-gray-300 active:bg-gray-200 disabled:active:bg-background {borderClasses}"
                    indeterminate="{value === 'indeterminate'}"
                    checked="{value === 'checked'}"
                    aria-label="{ariaLabel}"
                    aria-invalid="{!isValid}"
                    disabled="{disabled}"
                    class:text-primary="{value === 'indeterminate'}"
                    on:change="{handleChange}"
                    name="{name}"
                    required="{!optional}"
                    bind:this="{checkElement}"
                />
            </div>
        </span>
        {#if $$slots.default}
            <span class:text-gray="{disabled}" data-test="check-input-description">
                <slot />
                {#if optional && !hideOptionalLabel}
                    (optional)
                {/if}
            </span>
        {/if}
    </div>
    {#if !hideError && showError && !isValid}
        <Error>{requiredMessage}</Error>
    {/if}
</Label>
