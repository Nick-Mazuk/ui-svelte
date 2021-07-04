<script lang="ts">
    import { slugify } from '@nick-mazuk/lib/esm/text-styling'

    import Button from '../../elements/button/button.svelte'
    import Error from '../../elements/error/error.svelte'
    import ProgressBar from '../../elements/progress-bar/progress-bar.svelte'
    import Container from '../../utilities/container/container.svelte'

    import type { FormMethod, FormOnError, FormOnStateChange, FormState, HandleSubmit } from '..'
    import { FORM_FEEDBACK } from '../form-feedback'
    import Form from '../form/form.svelte'
    import type { DescriptionLink, ErrorMessages, FormEntityDispatcher } from '.'
    import { createEventDispatcher } from 'svelte'

    export let title: string
    export let description = ''
    export let descriptionLink: DescriptionLink | undefined = undefined
    export let hideHeader = false
    export let primaryAction = 'Save'
    export let primaryActionSubmit = true
    export let secondaryAction = ''
    export let secondaryActionSubmit = true
    export let destructiveAction = ''
    export let destructiveActionSubmit = true

    export let method: FormMethod = undefined
    export let action: string | undefined = undefined
    export let handleSubmit: HandleSubmit = undefined
    export let resetOnSubmit = false
    export let allowOffline = false
    export let error: Partial<ErrorMessages> | string = ''
    export let success = FORM_FEEDBACK.success.saved
    export let progress: number | undefined = undefined

    const defaultErrorMessages: ErrorMessages = {
        default: FORM_FEEDBACK.errors.default,
        offline: FORM_FEEDBACK.errors.offline,
        403: FORM_FEEDBACK.errors[403],
        429: FORM_FEEDBACK.errors[429],
        400: FORM_FEEDBACK.errors[400],
        500: FORM_FEEDBACK.errors[500],
    }
    const dispatch = createEventDispatcher<FormEntityDispatcher>()
    let formState: FormState = 'ready'

    let shownErrorMessage: string
    const handleStateChange = (event: FormOnStateChange) => (formState = event.detail)
    const handleError = (event: FormOnError) => {
        const { message, status } = event.detail
        if (typeof error === 'string' && error !== '') {
            shownErrorMessage = error
        } else if (message) {
            shownErrorMessage = message
        } else if (Object.keys(defaultErrorMessages).includes(String(status))) {
            const selectedError = errorMessages[status as keyof ErrorMessages]
            shownErrorMessage = selectedError ? selectedError : errorMessages.default
        } else {
            shownErrorMessage = errorMessages.default
        }
    }

    $: showProgress = typeof progress === 'number' && formState === 'submitting'
    $: isSubmitting = formState === 'submitting'
    let errorMessages: ErrorMessages
    $: {
        if (typeof error === 'string' && error !== '')
            errorMessages = { ...defaultErrorMessages, default: error }
        else errorMessages = { ...defaultErrorMessages, ...error }
    }
</script>

<Container padding="{false}" id="{slugify(title)}">
    <Form
        method="{method}"
        action="{action}"
        handleSubmit="{handleSubmit}"
        resetOnSubmit="{resetOnSubmit}"
        allowOffline="{allowOffline}"
        on:stateChange="{handleStateChange}"
        on:stateChange
        on:error="{handleError}"
        on:error
        on:success
    >
        <Container class="rounded-none -m-px">
            {#if !hideHeader}
                <div class="flex items-start justify-between">
                    <div>
                        <h3 class="h6" id="{slugify(title)}-form-title">{title}</h3>
                    </div>
                    {#if $$slots['extra-actions']}
                        <div class="relative flex space-x-3">
                            <slot name="extra-actions" />
                        </div>
                    {/if}
                </div>
                {#if description}
                    <p
                        class:mt-3="{!$$slots['extra-actions']}"
                        class:mt-2="{$$slots['extra-actions']}"
                        id="{slugify(title)}-form-description"
                    >
                        {description}
                        {#if descriptionLink}
                            <a sveltekit:prefetch href="{descriptionLink.href}" class="link">
                                {descriptionLink.value}&nbsp;→
                            </a>
                        {/if}
                    </p>
                {/if}
            {/if}
            <div
                class="form-layout"
                class:pt-3="{!hideHeader}"
                class:mt-3="{!hideHeader}"
                class:border-t="{!hideHeader}"
            >
                <slot />
            </div>
        </Container>
        {#if primaryAction || secondaryAction || destructiveAction || showProgress}
            <Container class="rounded-none -m-px py-3" variant="fill">
                <div
                    class="grid grid-flow-row-dense gap-3 sm:flex sm:space-x-4 sm:items-center {showProgress ||
                    (destructiveAction && (primaryAction || secondaryAction))
                        ? 'sm:justify-between'
                        : 'sm:justify-end'}"
                    class:flex-reverse="{!primaryAction && !secondaryAction}"
                >
                    {#if destructiveAction}
                        <div class="contents sm:flex-none sm:block">
                            <div class="row-start-3 flex flex-col items-stretch sm:contents">
                                <Button
                                    variant="error"
                                    size="small"
                                    loading="{isSubmitting}"
                                    on:click="{(event) => dispatch('destructiveClick', event)}"
                                    submit="{destructiveActionSubmit}"
                                >
                                    {destructiveAction}
                                </Button>
                            </div>
                        </div>
                    {/if}
                    {#if showProgress}
                        <div class="hidden w-full sm:block">
                            <ProgressBar value="{progress}" max="{1}" ariaLabel="Upload progress" />
                        </div>
                    {/if}
                    {#if shownErrorMessage && formState === 'error'}
                        <div class="hidden w-full sm:flex justify-end">
                            <Error label="">{shownErrorMessage}</Error>
                        </div>
                    {/if}
                    {#if formState === 'success'}
                        <div class="hidden w-full sm:flex justify-end">
                            <p data-test="form-entity-success">{success}</p>
                        </div>
                    {/if}
                    {#if primaryAction || secondaryAction}
                        <div class="contents sm:flex-none sm:flex sm:space-x-4 sm:justify-end">
                            {#if secondaryAction}
                                <div class="row-start-2 flex flex-col items-stretch">
                                    <Button
                                        variant="secondary"
                                        size="small"
                                        loading="{isSubmitting}"
                                        on:click="{(event) => dispatch('secondaryClick', event)}"
                                        submit="{secondaryActionSubmit}"
                                    >
                                        {secondaryAction}
                                    </Button>
                                </div>
                            {/if}
                            {#if primaryAction}
                                <div class="row-start-1 flex flex-col items-stretch">
                                    <Button
                                        size="small"
                                        loading="{isSubmitting}"
                                        on:click="{(event) => dispatch('primaryClick', event)}"
                                        submit="{primaryActionSubmit}"
                                    >
                                        {primaryAction}
                                    </Button>
                                </div>
                            {/if}
                        </div>
                    {/if}
                </div>
            </Container>
        {/if}
    </Form>
</Container>
