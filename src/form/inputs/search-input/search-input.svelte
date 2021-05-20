<script lang="ts">
    import Search from '../../../elements/icon/search.svelte'
    import type { FormItemSize } from '../../form-sizes'
    import type { TextInputAutocomplete } from '../text-input'
    import TextInput from '../text-input/text-input.svelte'

    export let label = ''
    export let name = ''
    export let defaultValue = ''
    export let placeholder = ''
    export let helpText = ''
    export let size: FormItemSize = 'default'
    export let optional = true
    export let hideOptionalLabel = true
    export let readonly = false
    export let disabled = false

    export let hideIcon = false
    export let requiredMessage = 'Enter your query'
    export let autocomplete: TextInputAutocomplete = undefined
    export let maxCharacters: number | undefined = undefined
    export let hideCharacterCount = false
    export let autofocus = false

    $: shownIcon = hideIcon ? undefined : Search

</script>

<TextInput
    type="search"
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
    keyboard="search"
    feedback="{hideCharacterCount ? '' : undefined}"
    autofocus="{autofocus}"
    on:change
/>
