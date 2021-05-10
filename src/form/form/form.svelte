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
    } from '..'

    export let method: FormMethod = undefined
    export let action: string | undefined = undefined
    let handleSubmitInput: HandleSubmit
    export { handleSubmitInput as handleSubmit }
    export let resetOnSubmit = false

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
    const updateForm: UpdateFormCallback = (name, data, validate, reset) => {
        if (name === '') return
        formInputs = { ...formInputs, [name]: { data, validate, reset } }
    }
    setContext<FormSync>('formSync', {
        formState,
        updateForm,
    })
    const dispatch = createEventDispatcher<FormDispatcher>()

    const resetForm = () => Object.keys(formInputs).forEach((input) => formInputs[input].reset())

    const submit = async () => {
        if (!window.navigator.onLine) {
            formState.set('error')
            dispatch('error', { data: formData, message: 'No internet access.' })
            return
        }
        formState.set('submitting')
        let success = false
        let errorDetails: FormOnErrorDetail = { data: formData }
        if (handleSubmitInput) {
            const response = await handleSubmitInput(formData)
            success = response === true
            if (!success) {
                if (typeof response === 'boolean') errorDetails = { data: formData }
                else errorDetails = { ...response, ...errorDetails }
            }
        } else if (method && action) {
            const response = await fetch(action, {
                method,
                body: JSON.stringify(formData),
            })
            success = response.status === 200
        }

        if (success) {
            formState.set('success')
            if (resetOnSubmit) resetForm()
            dispatch('success', formData)
        } else {
            formState.set('error')
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
        const tempFormData: FormData = {}
        Object.keys(formInputs).forEach((input) => (tempFormData[input] = formInputs[input].data))
        formData = tempFormData
    }
</script>

<form bind:this="{formElement}" on:submit|preventDefault="{handleSubmit}" novalidate>
    <slot />
</form>
