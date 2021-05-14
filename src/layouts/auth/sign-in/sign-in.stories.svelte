<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import SignIn from './sign-in.svelte'

    const meta = {
        title: 'Layouts/Auth/SignIn',
        component: SignIn,
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
            forgotPassword: {
                control: 'text',
                description: 'Link to the reset password page',
            },
            createAccount: {
                control: 'text',
                description: 'Link to the create account page',
            },
            seoTitle: {
                control: 'text',
                description: 'The title of the page (in the `title` tag)',
            },
            note: {
                control: 'object',
                description:
                    'To display some sort of message. NOTE: for password reset success messages, use the `passwordIsReset` prop instead.',
            },
            passwordIsReset: {
                control: 'boolean',
                description: 'Inform the user that their password was successfuly reset.',
            },
        },
    }

</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <SignIn {...args} />
</Story>
<Story
    name="With note"
    args="{{
        note: {
            value: 'Sign in or create an account to continue',
            variant: 'gray',
        },
    }}"
    let:args
>
    <SignIn {...args} />
</Story>
