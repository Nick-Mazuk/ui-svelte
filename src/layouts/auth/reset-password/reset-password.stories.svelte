<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import ResetPassword from './reset-password.svelte'

    const meta = {
        title: 'Layouts/Auth/ResetPassword',
        component: ResetPassword,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
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
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <ResetPassword {...args} />
</Story>
