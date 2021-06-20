<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import CheckInput from '../../../form/inputs/check-input/check-input.svelte'

    import SignUp from './sign-up.svelte'

    const meta = {
        title: 'Layouts/Auth/SignUp',
        component: SignUp,
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
            signIn: {
                control: 'text',
                description: 'Link to the sign in page',
            },
            note: {
                control: 'object',
                description: 'To display some sort of message.',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <SignUp {...args} />
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
    <SignUp {...args} />
</Story>

<Story name="Terms of service" let:args>
    <SignUp {...args}>
        <svelte:fragment slot="extra-fields">
            <CheckInput name="toc">I agree to the terms and privacy policy.</CheckInput>
        </svelte:fragment>
    </SignUp>
</Story>
