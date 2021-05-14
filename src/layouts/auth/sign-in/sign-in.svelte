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
        else if (typeof status === 'undefined') error = 'Invalid email or password. Try again.'
        else if (status === 'offline')
            error = 'You are offline. Connect to the internet and try again.'
        else if ([400, 403].includes(status)) error = 'Invalid email or password. Try again.'
        else if (status === 429)
            error = 'You are making too many requests. Wait a few minutes and try again.'
        else error = 'There was an internal error. Please try again.'
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
    <div class="grid grid-flow-row gap-4">
        {#if error}
            <Note variant="error">{error}</Note>
        {:else if note && formState === 'ready'}
            <Note label="{note.label}" variant="{note.variant}">{note.value}</Note>
        {:else if passwordIsReset && formState === 'ready'}
            <Note label="Success" variant="success">
                Your password is reset and you can sign in
            </Note>
        {/if}
        <EmailInput />
        <PasswordInput />
        {#if forgotPassword && createAccount}
            <a href="{forgotPassword}" sveltekit:prefetch class="link text-sm">Forgot password</a>
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
</Form>
