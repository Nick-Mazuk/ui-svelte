<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import MarketingIcon from './marketing-icon.svelte'

    const meta = {
        title: 'Elements/MarketingIcon',
        component: MarketingIcon,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            variant: {
                control: {
                    type: 'select',
                    options: ['primary', 'gray', 'error', 'highlight', 'warning', 'success'],
                },
                defaultValue: 'primary',
            },
            class: {
                control: 'text',
                defaultValue: 'w-48',
                description:
                    'Add Tailwind classes to the icon. _Note: in Storybook, not all classes will work because it uses precompiled CSS._',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <MarketingIcon {...args} />
</Story>
