<script lang="ts">
    import { slugify } from '@nick-mazuk/lib/js/text-styling'
    import Label from '../../label/label.svelte'
    import Error from '../../../elements/error/error.svelte'
    import TextInputAffix from './text-input-affix.svelte'
    import type { Formatter, Parser, Updater, ValidationRules } from '.'

    export let label = ''
    let nameProp = ''
    export { nameProp as name }
    export let disabled = false
    export let readonly = false
    export let optional = false
    export let hideOptionalLabel = false
    export let placeholder = ''
    export let defaultValue = ''
    export let value = defaultValue
    export let prefix: string | Function = ''
    export let suffix: string | Function = ''
    export let prefixButton: { label: string; onClick: () => void } | undefined = undefined
    export let suffixButton: { label: string; onClick: () => void } | undefined = undefined
    export let textRight = false
    export let helpText = ''
    export let feedback = ''
    export let requiredMessage = 'This field is required.'
    export let validationRules: ValidationRules = []
    export let parser: Parser = undefined
    export let updater: Updater = undefined
    export let formatter: Formatter = undefined

    const disabledClasses = disabled
        ? 'cursor-not-allowed !border-gray-200 !ring-0 !bg-gray-100 !text-gray-300'
        : 'hover:text-gray-800 focus-within:text-gray-800 text-gray'

    let isValid: boolean
    let showErrorMessage: boolean
    let errorMessage: string
    const handleBlur = () => (showErrorMessage = true)
    $: name = nameProp ? nameProp : slugify(label)
    $: {
        let tempIsValid = true
        let tempErrorMessage = ''
        if (value.length === 0 && !optional) {
            tempIsValid = false
            tempErrorMessage = requiredMessage
        } else {
            for (const rule of validationRules) {
                if (!rule.assert(value)) {
                    tempIsValid = false
                    tempErrorMessage = rule.error ?? ''
                }
            }
        }

        isValid = tempIsValid
        errorMessage = tempErrorMessage
    }
</script>

<Label
    value="{label}"
    readonly="{readonly}"
    optional="{optional}"
    hideOptionalLabel="{hideOptionalLabel}"
>
    <div
        class="input-wrapper {disabledClasses} h-10 flex items-center"
        class:input-wrapper-readonly="{readonly}"
        class:input-wrapper-disabled="{disabled}"
        class:input-wrapper-active="{!disabled && !readonly}"
    >
        {#if prefix}
            <TextInputAffix
                content="{prefix}"
                placement="prefix"
                buttonProps="{prefixButton}"
                disabled="{disabled}"
            />
        {/if}
        <input
            type="text"
            class="p-0 bg-transparent placeholder-gray border-none text-base focus:ring-0 w-full self-stretch text-foreground"
            class:cursor-not-allowed="{disabled}"
            class:pl-3="{!prefix}"
            class:pr-3="{!suffix}"
            class:text-right="{textRight}"
            bind:value
            disabled="{disabled}"
            readonly="{readonly}"
            placeholder="{placeholder}"
            name="{name}"
            on:blur="{handleBlur}"
        />
        {#if suffix}
            <TextInputAffix
                content="{suffix}"
                placement="suffix"
                buttonProps="{suffixButton}"
                disabled="{disabled}"
            />
        {/if}
    </div>
    <div
        class="grid grid-cols-2 gap-y-1"
        class:gap-x-6="{feedback}"
        style="grid-template-columns: minmax(0, 1fr) auto"
    >
        {#if helpText}
            <p class="col-start-1 text-sm text-gray-700">{helpText}</p>
        {/if}
        {#if feedback}
            <p class="col-start-2 text-sm text-gray-700 text-right">{feedback}</p>
        {/if}
        {#if !isValid && showErrorMessage}
            <div class="col-start-1" class:row-start-1="{!helpText}">
                <Error label="">{errorMessage}</Error>
            </div>
        {/if}
    </div>
</Label>
