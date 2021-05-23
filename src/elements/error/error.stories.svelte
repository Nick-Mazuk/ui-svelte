<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import Error from './error.svelte'
    import Spacer from '../../utilities/spacer/spacer.svelte'

    const meta = {
        title: 'Elements/Error',
        component: Error,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            label: {
                control: {
                    type: 'text',
                },
                defaultValue: 'Error',
            },
            action: {
                control: {
                    type: 'object',
                },
                description: 'An object containing `text` and `href`, both strings.',
            },
            size: {
                control: {
                    type: 'radio',
                    options: ['small', 'default', 'large'],
                },
                defaultValue: 'default',
            },
            dark: {
                control: 'boolean',
                description: 'For use on darker backgrounds to meet color contrast ratios',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <Error {...args}>Email address is already in use.</Error>
</Story>
<Story name="Action" args="{{ action: { href: '#', text: 'Contact us' } }}" let:args>
    <Error {...args}>Email address is already in use.</Error>
</Story>
<Story name="Custom label" args="{{ label: 'Email error' }}" let:args>
    <Error {...args}>Email address is already in use.</Error>
</Story>
<Story name="No label" args="{{ label: '' }}" let:args>
    <Error {...args}>Email address is already in use.</Error>
</Story>
<Story name="Multiline" let:args>
    <Error {...args}>
        This is a really long error message full of nonsense. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Consequatur esse, corporis illum adipisci error, eaque fugit sequi aliquid
        omnis consequuntur beatae praesentium ipsum molestias at natus ut hic tenetur voluptates.
    </Error>
</Story>
<Story name="Sizes" let:args>
    <Error {...args} size="small">Small error message.</Error>
    <Spacer />
    <Error {...args} size="default">Default error message.</Error>
    <Spacer />
    <Error {...args} size="large">Large error message.</Error>
</Story>
