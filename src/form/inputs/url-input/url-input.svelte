<script lang="ts">
    import isEmail from 'validator/es/lib/isEmail'
    import isURL from 'validator/es/lib/isURL'

    import Link from '../../../elements/icon/link.svelte'
    import type { FormItemSize } from '../../form-sizes'
    import type { TextInputAutocomplete } from '../text-input'
    import TextInput from '../text-input/text-input.svelte'

    export let label = 'Url'
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
    export let requiredMessage = 'Enter a url'
    export let autocomplete: TextInputAutocomplete = 'url'
    export let maxCharacters: number | undefined = undefined
    export let autofocus = false

    $: shownIcon = hideIcon ? undefined : Link
</script>

<TextInput
    type="url"
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
    maxCharacters="{maxCharacters}"
    prefix="{shownIcon}"
    autofocus="{autofocus}"
    keyboard="url"
    validationRules="{[
        {
            assert: (value) => isURL(value, { protocols: ['http', 'https'] }),
            error: `Enter a valid ${label}`,
        },
        { assert: (value) => !isEmail(value), error: 'Cannot be an email' },
    ]}"
    on:change
/>
