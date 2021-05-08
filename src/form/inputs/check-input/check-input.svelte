<script lang="ts">
    import { afterUpdate, getContext } from 'svelte'
    import type { Writable } from 'svelte/store'

    import Label from '../../label/label.svelte'
    import type { FormSync } from '../..'
    import type { CheckboxValue } from '.'
    import Error from '../../../elements/error/error.svelte'

    export let defaultValue: CheckboxValue = 'unchecked'
    export let value: CheckboxValue = defaultValue
    export let ariaLabel: string | undefined = undefined
    export let label: string | undefined = undefined
    let inputedName: string = ''
    export { inputedName as name }
    export let disabled = false
    export let optional = false
    export let hideOptionalLabel = false
    export let hideError = false
    export let info = ''
    export let requiredMessage: string = 'This is required'

    const labelValue = getContext<Writable<string> | undefined>('label')
    const formSync = getContext<FormSync>('formSync')
    let checkElement: HTMLInputElement | undefined
    let showError = false
    let isValid = false

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

<Label value="{label}" info="{info}" on:mouseup="{handleMouseUp}">
    <div class="inline-flex space-x-2 group" class:cursor-not-allowed="{disabled}">
        <span class="flex-none self-start flex items-center">
            <span>&ZeroWidthSpace;</span>
            <input
                type="checkbox"
                class="rounded cursor-pointer disabled:cursor-not-allowed checked:text-primary transition focus:ring-primary focus-ring focus:outline-none disabled:text-gray-300 disabled:border-gray-300 active:bg-gray-200 {borderClasses}"
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
        </span>
        {#if $$slots.default}
            <span class:text-gray="{disabled}">
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
