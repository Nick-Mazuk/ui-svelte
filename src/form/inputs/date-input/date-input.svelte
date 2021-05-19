<script lang="ts">
    import { dateStringToMilli, isValidDate } from '@nick-mazuk/lib/esm/time'

    import Calendar from '../../../elements/icon/calendar.svelte'
    import type { FormItemSize } from '../../form-sizes'
    import type { Parser, TextInputAutocomplete } from '../text-input'
    import TextInput from '../text-input/text-input.svelte'

    export let label = 'Date'
    export let name = ''
    export let defaultValue = ''
    export let placeholder = ''
    export let helpText = ''
    export let size: FormItemSize = 'default'
    export let optional = false
    export let hideOptionalLabel = false
    export let readonly = false
    export let disabled = false

    export let hideIcon = false
    export let requiredMessage = 'Enter a date'
    export let autocomplete: TextInputAutocomplete = undefined
    export let autofocus = false

    const parser: Parser = (date) => {
        return String(dateStringToMilli(date))
    }

    $: shownIcon = hideIcon ? undefined : Calendar
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
    prefix="{shownIcon}"
    keyboard="email"
    autofocus="{autofocus}"
    validationRules="{[
        {
            assert: (value) => isValidDate(value),
            error: 'Must be a valid date',
        },
    ]}"
    parser="{parser}"
    on:change
/>
