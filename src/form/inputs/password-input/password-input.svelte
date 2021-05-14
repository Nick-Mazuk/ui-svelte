<script lang="ts">
    import Lock from '../../../elements/icon/lock.svelte'
    import Eye from '../../../elements/icon/eye.svelte'
    import EyeOff from '../../../elements/icon/eye-off.svelte'
    import type { FormItemSize } from '../../form-sizes'
    import type { TextInputAutocomplete, Updater } from '../text-input'
    import TextInput from '../text-input/text-input.svelte'

    export let label = 'Password'
    export let name = 'password'
    export let defaultValue = ''
    export let placeholder = ''
    export let helpText = ''
    export let size: FormItemSize = 'default'
    export let optional = false
    export let hideOptionalLabel = false
    export let readonly = false
    export let disabled = false

    export let hideIcon = false
    export let requiredMessage = 'Enter your password'
    export let autocomplete: TextInputAutocomplete = 'current-password'
    export let autofocus = false

    let showPassword = false

    const updater: Updater = (value) => {
        if (value.length > 100) return value.slice(0, 100)
        return value
    }

    $: shownIcon = hideIcon ? undefined : Lock
    $: suffix = showPassword ? EyeOff : Eye
    $: suffixLabel = showPassword ? 'Hide password' : 'Show password'
</script>

<TextInput
    type="{showPassword ? 'text' : 'password'}"
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
    suffix="{suffix}"
    suffixButton="{{ label: suffixLabel, onClick: () => (showPassword = !showPassword) }}"
    autofocus="{autofocus}"
    updater="{updater}"
    on:change
/>
