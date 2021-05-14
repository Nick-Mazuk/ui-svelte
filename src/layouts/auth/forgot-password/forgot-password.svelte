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
    import Spacer from '../../../utilities/spacer/spacer.svelte'

    export let signIn: string
    export let seoTitle = 'Reset password'
    export let method: FormMethod = undefined
    export let action: string | undefined = undefined
    export let handleSubmit: HandleSubmit = undefined

    let error = ''
    let formState: FormState = 'ready'
    const handleError = (event: FormOnError) => {
        const { status, message } = event.detail
        if (message) error = message
        else if (status === 'offline')
            error = 'You are offline. Connect to the internet and try again.'
        else if (typeof status === 'undefined' || [400, 403].includes(status))
            error = 'There is not an account with that email.'
        else if (status === 429)
            error = 'You are making too many requests. Wait a few minutes and try again.'
        else error = 'There was an internal error. Please try again.'
    }
    const handleStateChange = (event: FormOnStateChange) => (formState = event.detail)

</script>

<svelte:head>
    <title>{seoTitle}</title>
</svelte:head>
<h1 class="h4 text-center">Reset password</h1>
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
        {:else if formState === 'success'}
            <Note variant="success" label="Success">
                Check your email for the password reset link.
            </Note>
        {/if}
        <EmailInput />
        <div class="flex justify-between">
            <Button variant="link" glue="{['left']}" href="{signIn}">Sign in</Button>
            <Button submit loading="{formState === 'submitting'}">Send reset link</Button>
        </div>
    </div>
</Form>
