<script lang="ts">
    import {
        addThousandsSeparators,
        fixedDecimals,
        formatNumber,
        stringToNumber,
        truncateDecimals,
        isNumber,
    } from '@nick-mazuk/lib/esm/number-styling'

    import type { FormItemSize } from '../../form-sizes'
    import type { Formatter, TextInputAutocomplete, Updater, ValidationRules } from '../text-input'
    import TextInput from '../text-input/text-input.svelte'

    export let label = 'Number'
    export let name = ''
    export let defaultValue = ''
    export let placeholder = ''
    export let helpText = ''
    export let size: FormItemSize = 'default'
    export let optional = false
    export let hideOptionalLabel = false
    export let readonly = false
    export let disabled = false
    export let requiredMessage = 'Enter a number'
    export let autofocus = false
    export let tabularNumbers = true

    export let decimals: number | undefined = undefined
    export let maxDecimals: number | undefined = undefined
    export let disallowNegatives = false
    export let min: number | undefined = undefined
    export let max: number | undefined = undefined

    export let prefix: string | unknown = ''
    export let suffix: string | unknown = ''
    export let prefixButton: { label: string; onClick: () => void } | undefined = undefined
    export let suffixButton: { label: string; onClick: () => void } | undefined = undefined
    export let textRight = false
    export let autocomplete: TextInputAutocomplete | undefined = undefined

    let formatter: Formatter
    let updater: Updater
    let validationRules: ValidationRules
    $: formatter = (value: string) => {
        if (typeof decimals === 'number') return fixedDecimals(formatNumber(value), decimals)
        return formatNumber(value)
    }
    $: updater = (value, oldValue) => {
        const displayedDecimals = typeof maxDecimals === 'undefined' ? decimals : maxDecimals
        if (disallowNegatives && value.match(/-/u)) return oldValue
        if (displayedDecimals === 0 && value.match(/\./u)) return oldValue
        if (value === '' || value === '-') return value
        if (isNumber(value)) {
            let string = addThousandsSeparators(value)
            if (typeof displayedDecimals === 'number')
                string = truncateDecimals(string, displayedDecimals)
            return string
        }
        return oldValue
    }
    $: {
        const rules: ValidationRules = []
        if (typeof min !== 'undefined') {
            const minValue = min
            rules.push({
                assert: (value) => stringToNumber(value) >= minValue,
                error: `Must be greater than ${formatNumber(minValue)}`,
            })
        }
        if (typeof max !== 'undefined') {
            const maxValue = max
            rules.push({
                assert: (value) => stringToNumber(value) <= maxValue,
                error: `Must be greater than ${formatNumber(maxValue)}`,
            })
        }
        validationRules = rules
    }

</script>

<TextInput
    type="text"
    label="{label}"
    name="{name}"
    defaultValue="{defaultValue}"
    placeholder="{placeholder}"
    helpText="{helpText}"
    size="{size}"
    optional="{optional}"
    hideOptionalLabel="{hideOptionalLabel}"
    readonly="{readonly}"
    disabled="{disabled}"
    requiredMessage="{requiredMessage}"
    autocomplete="{autocomplete}"
    prefix="{prefix}"
    suffix="{suffix}"
    prefixButton="{prefixButton}"
    suffixButton="{suffixButton}"
    textRight="{textRight}"
    tabularNumbers="{tabularNumbers}"
    autofocus="{autofocus}"
    updater="{updater}"
    formatter="{formatter}"
    parser="{stringToNumber}"
    validationRules="{validationRules}"
    keyboard="decimal"
    on:change
/>
