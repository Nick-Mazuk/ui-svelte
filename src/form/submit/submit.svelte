<script lang="ts">
    import { getContext } from 'svelte'
    import type { FormSync } from '..'

    import Button from '../../elements/button/button.svelte'
    import Error from '../../elements/error/error.svelte'
    import ProgressBar from '../../elements/progress-bar/progress-bar.svelte'

    type ErrorMessages = {
        default: string
        offline: string | false
        403: string | false
        429: string | false
        400: string | false
        500: string | false
    }

    export let progress: number | undefined = undefined
    export let success = 'Submitted successfully'
    export let error: Partial<ErrorMessages> | string = ''
    export let value = 'Submit'
    export let prefix: unknown | undefined = undefined
    export let suffix: unknown | undefined = undefined

    const formSync = getContext<FormSync>('formSync')
    const defaultErrorMessages: ErrorMessages = {
        default: 'There was an internal error. Please try again.',
        offline: 'You are offline. Connect to the internet and try again.',
        403: 'You are not authorized to make this request.',
        429: 'You are making too many requests. Wait a few minutes and try again.',
        400: 'There was an internal error. Please try again.',
        500: 'There was an internal error. Please try again.',
    }
    $: state = formSync?.formState
    $: errorStatus = formSync?.error
    let errorMessages: ErrorMessages
    $: {
        if (typeof error === 'string' && error !== '')
            errorMessages = { ...defaultErrorMessages, default: error }
        else errorMessages = { ...defaultErrorMessages, ...error }
    }
    let shownErrorMessage: string
    $: {
        if (!errorStatus) {
            shownErrorMessage = ''
        } else if (typeof error === 'string' && error !== '') {
            shownErrorMessage = error
        } else if (Object.keys(defaultErrorMessages).includes(String($errorStatus?.status))) {
            const selectedError = errorMessages[$errorStatus?.status as keyof ErrorMessages]
            shownErrorMessage = selectedError ? selectedError : errorMessages.default
        } else {
            shownErrorMessage = errorMessages.default
        }
    }
</script>

<div class="flex items-baseline justify-end space-x-6" data-test="submit">
    {#if state}
        {#if $state === 'success'}
            <p data-test="submit-success">{success}</p>
        {:else if $state === 'error' && shownErrorMessage}
            <Error>{shownErrorMessage}</Error>
        {:else if $state === 'submitting' && typeof progress !== 'undefined'}
            <div class="w-full self-stretch flex items-center">
                <div class="w-full">
                    <ProgressBar value="{progress}" max="{1}" ariaLabel="Upload progress" />
                </div>
            </div>
        {/if}
    {/if}
    <div class="flex-none">
        <Button
            submit
            loading="{state && $state === 'submitting'}"
            prefix="{prefix}"
            suffix="{suffix}">{value}</Button
        >
    </div>
</div>
