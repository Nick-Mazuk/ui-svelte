<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import LoadingSection from './loading-section.svelte'

    const meta = {
        title: 'Elements/LoadingSection',
        component: LoadingSection,
        parameters: {
            docs: {
                description: {
                    component:
                        'For whenever an entire section of content cannot display immediately',
                },
            },
        },
        argTypes: {
            size: {
                control: {
                    type: 'inline-radio',
                    options: ['small', 'default', 'large'],
                },
                name: 'size',
                defaultValue: 'default',
                type: { name: 'string', required: false },
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <LoadingSection {...args} />
</Template>

<Story name="Default" />
