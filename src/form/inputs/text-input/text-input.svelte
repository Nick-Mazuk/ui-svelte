<script lang="ts">
    import { slugify } from '@nick-mazuk/lib/js/text-styling'
    import { diffChars } from 'diff'

    import Label from '../../label/label.svelte'
    import Error from '../../../elements/error/error.svelte'
    import TextInputAffix from './text-input-affix.svelte'
    import type {
        Formatter,
        Parser,
        TextInputAutocomplete,
        TextInputDispatcher,
        TextInputKeyboard,
        TextInputType,
        Updater,
        ValidationRules,
    } from '.'
    import { createEventDispatcher, getContext, tick } from 'svelte'
    import type { FormSync } from '../..'
    import { FORM_SIZE_MAP } from '../../form-sizes'
    import type { FormItemSize } from '../../form-sizes'

    export let label = ''
    let nameProp = ''
    export { nameProp as name }
    export let type: TextInputType = 'text'
    export let size: FormItemSize = 'default'
    export let disabled = false
    export let readonly = false
    export let optional = false
    export let hideOptionalLabel = false
    export let placeholder = ''
    export let defaultValue = ''
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
    export let tabularNumbers = false
    export let keyboard: TextInputKeyboard = undefined
    export let autocomplete: TextInputAutocomplete = undefined

    const disabledClasses = disabled
        ? 'cursor-not-allowed !border-gray-200 !ring-0 !bg-gray-100 !text-gray-300'
        : 'hover:text-gray-800 focus-within:text-gray-800 text-gray'
    const dispatch = createEventDispatcher<TextInputDispatcher>()
    const formSync = getContext<FormSync>('formSync')

    let isValid: boolean
    let showError: boolean
    let errorMessage: string
    let value = defaultValue
    let parsedValue: string
    let formattedValue: string
    const handleBlur = () => {
        showError = true
        if (formatter) value = formatter(value)
    }
    const handleInput: svelte.JSX.FormEventHandler<HTMLInputElement | HTMLTextAreaElement> = async (
        event
    ) => {
        const inputtedValue = event.currentTarget.value
        const selection = event.currentTarget.selectionStart
        value = updater ? updater(event.currentTarget.value, value) : event.currentTarget.value
        event.currentTarget.value = value

        if (typeof selection !== 'number' || typeof updater === 'undefined') return

        const diff = diffChars(inputtedValue, value)
        let newSelection = selection
        let currentCharacter = 0
        diff.forEach((change) => {
            if (typeof change.count !== 'number') return
            if (currentCharacter < selection) {
                if (change.removed) newSelection -= change.count
                if (change.added) newSelection += change.count
            }
            currentCharacter += change.count
        })
        await tick()
        event.currentTarget.selectionStart = newSelection
        event.currentTarget.selectionEnd = newSelection
    }
    const reset = () => {
        value = defaultValue
        showError = false
    }
    $: name = nameProp ? nameProp : slugify(label)
    $: if (formSync)
        formSync.updateForm(
            name,
            parsedValue,
            () => {
                showError = true
                return isValid
            },
            reset
        )
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
        if (isValid) showError = false
    }
    $: {
        formattedValue = formatter ? formatter(value) : value
        parsedValue = parser ? parser(formattedValue) : formattedValue
        dispatch('change', { parsedValue, value })
    }
    $: sizeClasses = [
        FORM_SIZE_MAP[size].textSize,
        prefix ? '' : FORM_SIZE_MAP[size].content.paddingLeft,
        suffix ? '' : FORM_SIZE_MAP[size].content.paddingRight,
    ].join(' ')
    $: isInvalidState = !isValid && showError
</script>

<Label
    value="{label}"
    readonly="{readonly}"
    optional="{optional}"
    hideOptionalLabel="{hideOptionalLabel}"
>
    <div
        class="input-wrapper {disabledClasses} {FORM_SIZE_MAP[size].height} flex items-center"
        class:input-wrapper-readonly="{readonly}"
        class:input-wrapper-disabled="{disabled}"
        class:input-wrapper-active="{!disabled && !readonly && !isInvalidState}"
        class:input-wrapper-error="{isInvalidState}"
    >
        {#if prefix}
            <TextInputAffix
                content="{prefix}"
                placement="prefix"
                buttonProps="{prefixButton}"
                disabled="{disabled}"
                size="{size}"
                isInvalid="{isInvalidState}"
            />
        {/if}
        {#if type === 'textarea'}
            <textarea
                type="text"
                class="p-0 bg-transparent placeholder-gray border-none {sizeClasses} focus:ring-0 w-full self-stretch text-foreground"
                class:cursor-not-allowed="{disabled}"
                class:text-right="{textRight}"
                class:tabular-nums="{tabularNumbers}"
                value="{value}"
                disabled="{disabled}"
                readonly="{readonly}"
                placeholder="{placeholder}"
                inputmode="{keyboard}"
                autocomplete="{autocomplete}"
                name="{name}"
                on:blur="{handleBlur}"
                on:input="{handleInput}"
                rows="{4}"></textarea>
        {:else}
            <input
                class="p-0 bg-transparent placeholder-gray border-none {sizeClasses} focus:ring-0 w-full self-stretch text-foreground"
                class:cursor-not-allowed="{disabled}"
                class:text-right="{textRight}"
                class:tabular-nums="{tabularNumbers}"
                value="{value}"
                disabled="{disabled}"
                readonly="{readonly}"
                placeholder="{placeholder}"
                inputmode="{keyboard}"
                autocomplete="{autocomplete}"
                type="{type}"
                name="{name}"
                on:blur="{handleBlur}"
                on:input="{handleInput}"
            />
        {/if}
        {#if suffix}
            <TextInputAffix
                content="{suffix}"
                placement="suffix"
                buttonProps="{suffixButton}"
                disabled="{disabled}"
                size="{size}"
                isInvalid="{isInvalidState}"
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
        {#if !isValid && showError}
            <div class="col-start-1" class:row-start-1="{!helpText}">
                <Error label="">{errorMessage}</Error>
            </div>
        {/if}
    </div>
</Label>
