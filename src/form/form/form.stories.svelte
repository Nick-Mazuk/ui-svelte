<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Button from '../../elements/button/button.svelte'
    import CheckInput from '../inputs/check-input/check-input.svelte'
    import TextInput from '../inputs/text-input/text-input.svelte'

    import Form from './form.svelte'

    const meta = {
        title: 'Form/Form',
        component: Form,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            method: {
                control: {
                    type: 'select',
                    options: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
                },
            },
            action: {
                control: {
                    type: 'string',
                },
            },
            handleSubmit: {
                description:
                    'A function to handle the submit instead of letting the component submit. If `action`, `method`, and `handleSubmit` are all provided, `handleSubmit` will take precedence.',
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
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <Form {...args}>
        <CheckInput name="check">This is a checkbox</CheckInput>
        <TextInput label="Text input" />
        <Button submit>Submit</Button>
    </Form>
</Story>
