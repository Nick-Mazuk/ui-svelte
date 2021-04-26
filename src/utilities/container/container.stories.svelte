<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import Container from './container.svelte'

    const meta = {
        title: 'Utilities/Container',
        component: Container,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            padding: {
                control: {
                    type: 'select',
                    options: [
                        'none',
                        'smallest',
                        'smaller',
                        'small',
                        'default',
                        'large',
                        'larger',
                        'largest',
                        true,
                        false,
                    ],
                },
                defaultValue: 'default',
            },
            rounded: {
                control: {
                    type: 'select',
                    options: ['none', 'small', 'default', 'large', 'larger'],
                },
                defaultValue: 'default',
            },
            variant: {
                control: {
                    type: 'select',
                    options: ['border', 'click', 'fill', 'disable'],
                },
            },
            href: {
                control: {
                    type: 'text',
                },
            },
            class: {
                control: {
                    type: 'text',
                },
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <Container {...args}>This is some content</Container>
</Template>

<Story name="Default" parameters="{{ jest: ['container.test.ts'] }}" />
