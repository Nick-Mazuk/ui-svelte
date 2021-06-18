<script lang="ts">
    import isEmail from 'validator/lib/isEmail.js'
    import isURL from 'validator/lib/isURL.js'
    import { parseFullName } from 'parse-full-name-esm'

    import User from '../../../elements/icon/user.svelte'
    import type { FormItemSize } from '../../form-sizes'
    import type { Parser, TextInputAutocomplete } from '../text-input'
    import TextInput from '../text-input/text-input.svelte'

    export let label = 'Name'
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
    export let requiredMessage = 'Enter your name'
    export let autocomplete: TextInputAutocomplete = 'name'
    export let maxCharacters: number | undefined = undefined
    export let autofocus = false

    const parser: Parser = (value) => {
        const parsedName = parseFullName(value)
        if (parsedName.error?.length !== 0) return value
        return {
            title: parsedName.title ?? '',
            first: parsedName.first ?? '',
            middle: parsedName.middle ?? '',
            last: parsedName.last ?? '',
            nick: parsedName.nick ?? '',
            suffix: parsedName.suffix ?? '',
            full: value,
        }
    }

    $: shownIcon = hideIcon ? undefined : User

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
    maxCharacters="{maxCharacters}"
    prefix="{shownIcon}"
    autofocus="{autofocus}"
    validationRules="{[
        {
            assert: (value) => !isEmail(value),
            error: 'Cannot be an email',
        },
        {
            assert: (value) => !isURL(value),
            error: 'Cannot be a url',
        },
    ]}"
    parser="{parser}"
    on:change
/>
