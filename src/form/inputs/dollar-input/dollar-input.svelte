<script lang="ts">
    import type { FormItemSize } from '../../form-sizes'
    import type { TextInputAutocomplete } from '../text-input'
    import NumberInput from '../number-input/number-input.svelte'

    export let label = 'Dollar'
    export let name = ''
    export let defaultValue = ''
    export let placeholder = ''
    export let helpText = ''
    export let size: FormItemSize = 'default'
    export let optional = false
    export let hideOptionalLabel = false
    export let readonly = false
    export let disabled = false
    export let requiredMessage = 'Enter an amount'
    export let autofocus = false
    export let tabularNumbers = true

    export let decimals: 0 | 2 = 2
    export let disallowNegatives = false
    export let min: number | undefined = undefined
    export let max: number | undefined = undefined

    export let autocomplete: TextInputAutocomplete | undefined = undefined
</script>

<NumberInput
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
    prefix="$"
    tabularNumbers="{tabularNumbers}"
    autofocus="{autofocus}"
    decimals="{decimals}"
    disallowNegatives="{disallowNegatives}"
    min="{min}"
    max="{max}"
    on:change
/>
