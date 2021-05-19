<script lang="ts">
    import { createEventDispatcher, setContext } from 'svelte'

    import { writable } from 'svelte/store'
    import type {
        FormMethod,
        FormState,
        UpdateFormCallback,
        FormSync,
        FormDataValue,
        HandleSubmit,
        FormData,
        FormDispatcher,
        FormOnErrorDetail,
        FormSyncError,
    } from '..'
    import { FORM_FEEDBACK } from '../form-feedback'

    export let method: FormMethod = undefined
    export let action: string | undefined = undefined
    let handleSubmitInput: HandleSubmit
    export { handleSubmitInput as handleSubmit }
    export let resetOnSubmit = false
    export let allowOffline = false

    type FormInputs = {
        [name: string]: {
            validate: () => boolean
            data: FormDataValue
            reset: () => void
        }
    }

    let formElement: HTMLFormElement
    let formInputs: FormInputs = {}
    let formData: FormData = {}
    const formState = writable<FormState>('ready')
    const formError = writable<FormSyncError | undefined>(undefined)
    const updateForm: UpdateFormCallback = (name, data, validate, reset) => {
        if (name === '') return
        formInputs = { ...formInputs, [name]: { data, validate, reset } }
    }
    setContext<FormSync>('formSync', {
        formState,
        updateForm,
        error: formError,
    })
    const dispatch = createEventDispatcher<FormDispatcher>()

    const resetForm = () => {
        formElement.reset()
        Object.keys(formInputs).forEach((input) => formInputs[input].reset())
    }

    const handleOffline = () => {
        if (!window.navigator.onLine && !allowOffline) {
            formState.set('error')
            dispatch('error', {
                data: formData,
                message: FORM_FEEDBACK.errors.offline,
            })
            formError.set({ status: 'offline' })
            return true
        }
        return false
    }
    const performSubmitRequest = async () => {
        let success = false
        let errorDetails: FormOnErrorDetail = { data: formData }

        if (handleSubmitInput) {
            const response = await handleSubmitInput(formData)
            success = response === true
            if (!success) {
                if (typeof response === 'boolean') errorDetails = { data: formData }
                else errorDetails = { ...errorDetails, ...response }
            }
            return { success, errorDetails }
        }

        if (!method || !action) return { success, errorDetails }

        const response = await fetch(action, {
            method,
            body: JSON.stringify(formData),
        })
        success = response.status === 200
        if (!success) errorDetails = { ...errorDetails, status: response.status }

        return { success, errorDetails }
    }
    const submit = async () => {
        if (handleOffline()) return
        formState.set('submitting')

        const { success, errorDetails } = await performSubmitRequest()

        if (success) {
            formState.set('success')
            if (resetOnSubmit) resetForm()
            dispatch('success', formData)
        } else {
            formState.set('error')
            formError.set({ status: errorDetails.status || 'unknown' })
            dispatch('error', errorDetails)
        }
    }

    const handleSubmit: svelte.JSX.FormEventHandler<HTMLFormElement> = () => {
        const inputs = Object.keys(formInputs)
        let isValid = true
        inputs.forEach((input) => {
            if (!formInputs[input].validate()) isValid = false
        })
        if (!isValid) return
        if (!(method && action) && !handleSubmitInput) return
        submit()
    }
    $: dispatch('stateChange', $formState)
    $: {
        const temporaryFormData: FormData = {}
        Object.keys(formInputs).forEach(
            (input) => (temporaryFormData[input] = formInputs[input].data)
        )
        formData = temporaryFormData
    }
</script>

<form bind:this="{formElement}" on:submit|preventDefault="{handleSubmit}" novalidate>
    <slot />
</form>
