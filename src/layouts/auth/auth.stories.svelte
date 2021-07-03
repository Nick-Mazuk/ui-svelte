<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import Auth from './auth.svelte'
    import SignIn from './sign-in/sign-in.svelte'

    const meta = {
        title: 'Layouts/Auth',
        component: Auth,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            siteTitle: {
                control: 'text',
                defaultValue: 'Site title',
            },
            logo: {
                control: 'text',
            },
            links: {
                control: 'object',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" parameters="{{ layout: 'fullscreen' }}" let:args>
    <Auth {...args} />
</Story>
<Story
    name="With logo"
    args="{{ logo: 'https://placeimg.com/80/80/people' }}"
    parameters="{{ layout: 'fullscreen' }}"
    let:args
>
    <Auth {...args} />
</Story>
<Story
    name="With links"
    args="{{
        links: [
            { value: 'Help', href: '#' },
            { value: 'Terms', href: '#' },
            { value: 'Privacy', href: '#' },
        ],
    }}"
    parameters="{{ layout: 'fullscreen' }}"
    let:args
>
    <Auth {...args} />
</Story>
<Story
    name="Example"
    args="{{
        links: [
            { value: 'Help', href: '#' },
            { value: 'Terms', href: '#' },
            { value: 'Privacy', href: '#' },
        ],
        logo: 'https://placeimg.com/80/80/people',
    }}"
    parameters="{{ layout: 'fullscreen' }}"
    let:args
>
    <Auth {...args}>
        <SignIn forgotPassword="#" createAccount="#" />
    </Auth>
</Story>
