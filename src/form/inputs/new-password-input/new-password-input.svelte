<script lang="ts">
    import Lock from '../../../elements/icon/lock.svelte'
    import Eye from '../../../elements/icon/eye.svelte'
    import EyeOff from '../../../elements/icon/eye-off.svelte'
    import type { FormItemSize } from '../../form-sizes'
    import type { TextInputAutocomplete, TextInputChangeEvent, Updater } from '../text-input'
    import TextInput from '../text-input/text-input.svelte'
    import zxcvbn from 'zxcvbn-esm'

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
    export let autocomplete: TextInputAutocomplete = 'new-password'
    export let autofocus = false

    let showPassword = false
    let strength = zxcvbn(defaultValue)

    const updater: Updater = (value) => {
        if (value.length > 100) return value.slice(0, 100)
        return value
    }
    const handleChange = (event: TextInputChangeEvent) => {
        const newPassword = event.detail.value
        strength = zxcvbn(newPassword)
    }

    $: shownIcon = hideIcon ? undefined : Lock
    $: suffix = showPassword ? EyeOff : Eye
    $: suffixLabel = showPassword ? 'Hide password' : 'Show password'
    let feedbackBackground: string
    let feedbackText: string
    $: {
        if (strength.score === 1) feedbackBackground = 'bg-error'
        else if (strength.score === 2) feedbackBackground = 'bg-error'
        else if (strength.score === 3) feedbackBackground = 'bg-primary'
        else if (strength.score === 4) feedbackBackground = 'bg-success'
    }
    $: {
        if (strength.score === 0) feedbackText = 'Very weak'
        else if (strength.score === 1) feedbackText = 'Weak'
        else if (strength.score === 2) feedbackText = 'So-so'
        else if (strength.score === 3) feedbackText = 'Good'
        else if (strength.score === 4) feedbackText = 'Great!'
    }
    $: strengthFeedback = (strength.feedback.warning
        ? [strength.feedback.warning, ...strength.feedback.suggestions]
        : strength.feedback.suggestions
    )
        .filter((item: string) => item !== 'No need for symbols, digits, or uppercase letters')
        .slice(0, 2)
        .join('. ')
        .replace(/\.\./gu, '.')

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
    feedback="{feedbackText}"
    validationRules="{[
        {
            assert: () => strength.score > 2,
            error: strengthFeedback ? strengthFeedback : 'Password is too weak.',
        },
    ]}"
    on:change
    on:change="{handleChange}"
>
    <svelte:fragment slot="before-feedback">
        <div class="grid grid-flow-col w-full gap-1 pt-1" slot="trigger">
            {#each Array(4) as _, i}
                <div
                    class="h-1 rounded-full {i < strength.score
                        ? feedbackBackground
                        : 'bg-gray-200'}"
                ></div>
            {/each}
        </div>
    </svelte:fragment>
</TextInput>
