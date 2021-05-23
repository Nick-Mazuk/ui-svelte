<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Button from '../../../elements/button/button.svelte'
    import { FORM_FEEDBACK } from '../../../form/form-feedback'
    import UrlInput from '../../../form/inputs/url-input/url-input.svelte'

    import ModalForm from './modal-form.svelte'

    const meta = {
        title: 'Components/Modal/ModalForm',
        component: ModalForm,
        parameters: {
            docs: {
                description: {
                    component:
                        'A modal version of the form-entity componenent. All valid props to form-entity props will be passed down.',
                },
            },
        },
        argTypes: {
            title: {
                control: 'text',
                defaultValue: 'Title',
            },
            description: {
                control: 'text',
            },
            isOpen: {
                control: 'boolean',
            },
            size: {
                control: {
                    type: 'select',
                    options: ['small', 'default', 'large'],
                },
                defaultValue: 'default',
            },
            descriptionLink: {
                control: 'object',
            },
            primaryAction: {
                control: 'text',
                defaultValue: 'Save',
            },
            secondaryAction: {
                control: 'text',
            },
            destructiveAction: {
                control: 'text',
            },
            handleSubmit: {
                description:
                    'A function to handle the submission. Passed directly to the `Form` component.',
            },
            method: {
                description:
                    'The method to submit the form. Not needed if using `handleSubmit`. Passed directly to the `Form` component.',
            },
            action: {
                description:
                    'The url to send the http request to. Not needed if using `handleSubmit`. Passed directly to the `Form` component.',
            },
            resetOnSubmit: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
                description:
                    'Resets all form inputs to their default values after the form is submitted successfully.',
            },
            allowOffline: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
                description:
                    'By default, the form will detect if a user is offline and will throw an error. Use this prop to remove this behavior and allow the user to submit the form without internet access.',
            },
            success: {
                control: {
                    type: 'text',
                },
                defaultValue: FORM_FEEDBACK.success.saved,
            },
            error: {
                control: {
                    type: 'object',
                },
                description:
                    'Error messages to display if the submit fails. Accepts either an object or a string. If `error` is a string, that string will be shown reguardless of the error. If `error` is an object, it replaces any of the default messages. The object can be partial. If any value is set to false, the default error message will be shown instead for that error.',
                defaultValue: {
                    default: FORM_FEEDBACK.errors.default,
                    offline: FORM_FEEDBACK.errors.offline,
                    403: FORM_FEEDBACK.errors[403],
                    429: FORM_FEEDBACK.errors[429],
                    400: FORM_FEEDBACK.errors[400],
                    500: FORM_FEEDBACK.errors[500],
                },
            },
            progress: {
                control: {
                    type: 'range',
                    min: 0,
                    max: 1,
                    step: 0.05,
                },
                description: 'For longer tasks like file uploads, show a progress bar.',
            },
        },
    }

    let isOpen = false

    const handleSubmit = () => {
        isOpen = false
        return Promise.resolve(true)
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <ModalForm
        {...args}
        bind:isOpen
        on:confirm="{() => (isOpen = false)}"
        handleSubmit="{handleSubmit}"
        success=""
    >
        <UrlInput optional hideOptionalLabel />
    </ModalForm>
    <Button variant="secondary" on:click="{() => (isOpen = true)}">Open modal</Button>
</Story>
