<script lang="ts">
    import isURL from 'validator/es/lib/isURL'
    import { isFacebookUrl, isFacebookPageUrl } from '@nick-mazuk/lib/esm/facebook'

    import Facebook from '../../../elements/icon/facebook.svelte'
    import type { FormItemSize } from '../../form-sizes'
    import type { TextInputAutocomplete } from '../text-input'
    import TextInput from '../text-input/text-input.svelte'

    export let label = 'Facebook'
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
    export let requiredMessage = 'Enter a Facebook page'
    export let autocomplete: TextInputAutocomplete = undefined
    export let autofocus = false

    $: shownIcon = hideIcon ? undefined : Facebook
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
    prefix="{shownIcon}"
    keyboard="url"
    autofocus="{autofocus}"
    validationRules="{[
        {
            assert: (value) => isURL(value, { protocols: ['http', 'https'] }),
            error: `Enter a valid url`,
        },
        {
            assert: (value) => isFacebookUrl(value),
            error: 'Must be a Facebook url',
        },
        {
            assert: (value) => isFacebookPageUrl(value),
            error: 'Enter a Facebook page url',
        },
    ]}"
    on:change
/>
