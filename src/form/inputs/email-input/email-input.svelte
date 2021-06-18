<script lang="ts">
    import isEmail from 'validator/es/lib/isEmail'
    import normalizeEmail from 'validator/es/lib/normalizeEmail'

    import Mail from '../../../elements/icon/mail.svelte'
    import type { FormItemSize } from '../../form-sizes'
    import type { Parser, TextInputAutocomplete } from '../text-input'
    import TextInput from '../text-input/text-input.svelte'

    export let label = 'Email'
    export let name = 'email'
    export let defaultValue = ''
    export let placeholder = ''
    export let helpText = ''
    export let size: FormItemSize = 'default'
    export let optional = false
    export let hideOptionalLabel = false
    export let readonly = false
    export let disabled = false

    export let hideIcon = false
    export let requiredMessage = 'Enter your email'
    export let autocomplete: TextInputAutocomplete = 'email'
    export let maxCharacters: number | undefined = undefined
    export let autofocus = false

    const parser: Parser = (email) => {
        if (!isEmail(email)) return email
        /* eslint-disable camelcase -- 3rd-party api */
        const parsedEmail = normalizeEmail(email, {
            gmail_lowercase: true,
            gmail_remove_dots: false,
            outlookdotcom_lowercase: true,
            yahoo_lowercase: true,
            icloud_lowercase: true,
            all_lowercase: false,
        })
        /* eslint-enable camelcase -- 3rd-party api */
        if (parsedEmail) return parsedEmail
        return email
    }

    $: shownIcon = hideIcon ? undefined : Mail

</script>

<TextInput
    type="email"
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
    keyboard="email"
    autofocus="{autofocus}"
    validationRules="{[
        {
            assert: (value) => isEmail(value),
            error: 'Email is invalid. Enter a valid email.',
        },
    ]}"
    parser="{parser}"
    on:change
/>
