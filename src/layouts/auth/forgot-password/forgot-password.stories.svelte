<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import ForgotPassword from './forgot-password.svelte'

    const meta = {
        title: 'Layouts/Auth/ForgotPassword',
        component: ForgotPassword,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            signIn: {
                control: 'text',
                description: 'Url back to the sign in page',
                defaultValue: '#',
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
            seoTitle: {
                control: 'text',
                description: 'The title of the page (in the `title` tag)',
            },
        },
    }

</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <ForgotPassword {...args} />
</Story>
