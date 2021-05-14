<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Form from '../form/form.svelte'
    import Send from '../../elements/icon/send.svelte'
    import Submit from './submit.svelte'
    import { FORM_FEEDBACK } from '../form-feedback'

    const meta = {
        title: 'Form/Submit',
        component: Submit,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            value: {
                control: {
                    type: 'text',
                },
                defaultValue: 'Submit',
                descriptin: 'Button text',
            },
            success: {
                control: {
                    type: 'text',
                },
                defaultValue: FORM_FEEDBACK.success.default,
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
            prefix: {
                description: 'Icon prefix',
            },
            suffix: {
                description: 'Icon prefix',
            },
        },
    }

    const handleSubmit = () => Promise.resolve(true)
    const handleSubmitTimeout = () => {
        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                resolve(true)
            }, 500)
        })
    }

</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <Form handleSubmit="{handleSubmitTimeout}">
        <Submit {...args} />
    </Form>
</Story>
<Story name="Prefix and suffix" let:args>
    <div class="grid gap-4">
        <Form handleSubmit="{handleSubmit}">
            <Submit {...args} prefix="{Send}" value="Prefix" />
        </Form>
        <Form handleSubmit="{handleSubmit}">
            <Submit {...args} suffix="{Send}" value="Suffix" />
        </Form>
    </div>
</Story>
<Story name="Progress bar" args="{{ progress: 0.5 }}" let:args>
    <Form handleSubmit="{handleSubmitTimeout}">
        <Submit {...args} />
    </Form>
</Story>
<Story name="Errors" let:args>
    <div class="grid gap-4">
        <Form handleSubmit="{() => Promise.resolve(false)}">
            <Submit {...args} value="Default error" />
        </Form>
        <Form handleSubmit="{() => Promise.resolve({ status: 'offline' })}">
            <Submit {...args} value="Offline" />
        </Form>
        <Form handleSubmit="{() => Promise.resolve({ status: 400 })}">
            <Submit {...args} value="400: bad request" />
        </Form>
        <Form handleSubmit="{() => Promise.resolve({ status: 403 })}">
            <Submit {...args} value="403: unauthorized" />
        </Form>
        <Form handleSubmit="{() => Promise.resolve({ status: 429 })}">
            <Submit {...args} value="429: too many requests" />
        </Form>
        <Form handleSubmit="{() => Promise.resolve({ status: 500 })}">
            <Submit {...args} value="500: internal" />
        </Form>
    </div>
</Story>
