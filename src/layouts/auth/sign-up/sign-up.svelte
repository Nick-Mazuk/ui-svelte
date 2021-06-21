<script lang="ts">
    import Button from '../../../elements/button/button.svelte'
    import Note from '../../../elements/note/note.svelte'
    import type {
        FormMethod,
        FormOnError,
        FormOnStateChange,
        FormState,
        HandleSubmit,
    } from '../../../form'
    import { FORM_FEEDBACK } from '../../../form/form-feedback'
    import Form from '../../../form/form/form.svelte'
    import EmailInput from '../../../form/inputs/email-input/email-input.svelte'
    import NewPasswordInput from '../../../form/inputs/new-password-input/new-password-input.svelte'
    import Spacer from '../../../utilities/spacer/spacer.svelte'

    type Note = {
        value: string
        label?: string
        variant: 'error' | 'success' | 'gray'
    }

    export let signIn = ''
    export let note: Note | undefined = undefined
    export let method: FormMethod = undefined
    export let action: string | undefined = undefined
    export let handleSubmit: HandleSubmit = undefined
    export let showConfirmEmailMessage = false

    let error = ''
    let formState: FormState = 'ready'
    const handleError = (event: FormOnError) => {
        const { status, message } = event.detail
        if (message) error = message
        else if (status === 'offline') error = FORM_FEEDBACK.errors.offline
        else if (typeof status === 'undefined' || [400, 403].includes(status))
            error = FORM_FEEDBACK.auth.errors.invalidEmailLogin
        else if (status === 429) error = FORM_FEEDBACK.errors[429]
        else error = FORM_FEEDBACK.errors[500]
    }
    const handleStateChange = (event: FormOnStateChange) => (formState = event.detail)
</script>

<h1 class="h4 text-center">Create account</h1>
<Spacer />
<Form
    method="{method}"
    action="{action}"
    handleSubmit="{handleSubmit}"
    on:error="{handleError}"
    on:stateChange="{handleStateChange}"
    on:success="{() => (error = '')}"
    on:success
>
    <div class="form-layout">
        {#if error}
            <Note variant="error">{error}</Note>
        {:else if note && formState === 'ready'}
            <Note label="{note.label}" variant="{note.variant}">{note.value}</Note>
        {:else if showConfirmEmailMessage && formState === 'success'}
            <Note label="Account created" variant="success">Confirm your email to sign in</Note>
        {/if}
        <EmailInput />
        <NewPasswordInput />
        <slot name="extra-fields" />
        <div class="grid grid-cols-1 gap-2">
            <div class="flex" class:justify-between="{signIn}" class:justify-end="{!signIn}">
                {#if signIn}
                    <Button variant="link" glue="{['left']}" href="{signIn}">Sign in</Button>
                {/if}
                <Button submit loading="{formState === 'submitting'}">Create account</Button>
            </div>
        </div>
    </div>
</Form>
