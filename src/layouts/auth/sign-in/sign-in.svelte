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
    import FormLayout from '../../../form/form-layout/form-layout.svelte'
    import Form from '../../../form/form/form.svelte'
    import EmailInput from '../../../form/inputs/email-input/email-input.svelte'
    import PasswordInput from '../../../form/inputs/password-input/password-input.svelte'
    import Spacer from '../../../utilities/spacer/spacer.svelte'

    type Note = {
        value: string
        label?: string
        variant: 'error' | 'success' | 'gray'
    }

    export let forgotPassword = ''
    export let createAccount = ''
    export let seoTitle = 'Sign in'
    export let note: Note | undefined = undefined
    export let passwordIsReset = false
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
            error = FORM_FEEDBACK.auth.errors.invalidEmailLogin
        else if (status === 429) error = FORM_FEEDBACK.errors[429]
        else error = FORM_FEEDBACK.errors[500]
    }
    const handleStateChange = (event: FormOnStateChange) => (formState = event.detail)
</script>

<svelte:head>
    <title>{seoTitle}</title>
</svelte:head>
<h1 class="h4 text-center">Sign in</h1>
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
    <FormLayout>
        {#if error}
            <Note variant="error">{error}</Note>
        {:else if note && formState === 'ready'}
            <Note label="{note.label}" variant="{note.variant}">{note.value}</Note>
        {:else if passwordIsReset && formState === 'ready'}
            <Note label="Success" variant="success">
                {FORM_FEEDBACK.auth.success.passwordIsReset}
            </Note>
        {/if}
        <EmailInput />
        <PasswordInput />
        <div class="grid grid-cols-1 gap-2">
            {#if forgotPassword && createAccount}
                <a href="{forgotPassword}" sveltekit:prefetch class="link text-sm"
                    >Forgot password</a
                >
            {/if}
            <div
                class="flex"
                class:justify-between="{createAccount || forgotPassword}"
                class:justify-end="{!createAccount && !forgotPassword}"
            >
                {#if createAccount}
                    <Button variant="link" glue="{['left']}" href="{createAccount}">
                        Create account
                    </Button>
                {:else if forgotPassword}
                    <Button variant="link" glue="{['left']}" href="{forgotPassword}">
                        Forgot password
                    </Button>
                {/if}
                <Button submit loading="{formState === 'submitting'}">Sign in</Button>
            </div>
        </div>
    </FormLayout>
</Form>
