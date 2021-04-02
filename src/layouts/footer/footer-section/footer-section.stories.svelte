<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import FooterSection from './footer-section.svelte'

    const meta = {
        title: 'Layouts/Footer/FooterSection',
        component: FooterSection,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {},
    }
</script>

<Meta {...meta} />

<Template let:args>
    <FooterSection {...args} />
</Template>

<Story name="Default" parameters="{{ jest: ['footer-section.test.ts'] }}" />
