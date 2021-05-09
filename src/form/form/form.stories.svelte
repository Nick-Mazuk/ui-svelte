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
        argTypes: {},
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <Form
        {...args}
        on:success="{() => alert('success')}"
        handleSubmit="{() => Promise.resolve(true)}"
        resetOnSubmit
    >
        <CheckInput name="check">This is a checkbox</CheckInput>
        <TextInput label="Text input" />
        <Button submit>Submit</Button>
    </Form>
</Story>
