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
    import NewPasswordInput from '../../../form/inputs/new-password-input/new-password-input.svelte'
    import Spacer from '../../../utilities/spacer/spacer.svelte'

    export let method: FormMethod = undefined
    export let action: string | undefined = undefined
    export let handleSubmit: HandleSubmit = undefined

    let error = ''
    let formState: FormState = 'ready'
    const handleError = (event: FormOnError) => {
        const { status, message } = event.detail
        if (message) error = message
        else if (status === 'offline') error = FORM_FEEDBACK.errors.offline
        else if (typeof status === 'undefined' || [400, 403].includes(status))
            error = FORM_FEEDBACK.auth.errors.noEmailFound
        else if (status === 429) error = FORM_FEEDBACK.errors[429]
        else error = FORM_FEEDBACK.errors[500]
    }
    const handleStateChange = (event: FormOnStateChange) => (formState = event.detail)
</script>

<h1 class="h4 text-center">Set new password</h1>
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
        {/if}
        <NewPasswordInput />
        <div class="flex justify-end">
            <Button submit loading="{formState === 'submitting'}">Set password</Button>
        </div>
    </div>
</Form>
