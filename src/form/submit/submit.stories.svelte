<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Form from '../form/form.svelte'
    import Send from '../../elements/icon/send.svelte'
    import Submit from './submit.svelte'

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
                defaultValue: 'Submitted successfully',
            },
            error: {
                control: {
                    type: 'object',
                },
                description:
                    'Error messages to display if the submit fails. Accepts either an object or a string. If `error` is a string, that string will be shown reguardless of the error. If `error` is an object, it replaces any of the default messages. The object can be partial. If any value is set to false, the default error message will be shown instead for that error.',
                defaultValue: {
                    default: 'There was an internal error. Please try again.',
                    offline: 'You are offline. Connect to the internet and try again.',
                    403: 'You are not authorized to make this request.',
                    429: 'You are making too many requests. Wait a few minutes and try again.',
                    400: 'There was an internal error. Please try again.',
                    500: 'There was an internal error. Please try again.',
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
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <Form handleSubmit="{() => new Promise((resolve) => setTimeout(() => resolve(true), 500))}">
        <Submit {...args} />
    </Form>
</Story>
<Story name="Prefix and suffix" let:args>
    <div class="grid gap-4">
        <Form handleSubmit="{() => Promise.resolve(true)}">
            <Submit {...args} prefix="{Send}" value="Prefix" />
        </Form>
        <Form handleSubmit="{() => Promise.resolve(true)}">
            <Submit {...args} suffix="{Send}" value="Suffix" />
        </Form>
    </div>
</Story>
<Story name="Progress bar" args="{{ progress: 0.5 }}" let:args>
    <Form handleSubmit="{() => new Promise((resolve) => setTimeout(() => resolve(true), 500))}">
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
