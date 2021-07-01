<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import Oauth from './oauth.svelte'

    const meta = {
        title: 'Layouts/Auth/Oauth',
        component: Oauth,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            apple: {
                control: 'boolean',
                defaultValue: true,
            },
            facebook: {
                control: 'boolean',
                defaultValue: true,
            },
            google: {
                control: 'boolean',
                defaultValue: true,
            },
            twitter: {
                control: 'boolean',
                defaultValue: true,
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <Oauth {...args} />
</Story>
