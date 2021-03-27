<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import LoadingSection from './loading-section.svelte'

    const meta = {
        title: 'Utilities/LoadingSection',
        component: LoadingSection,
        argTypes: {
            
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <LoadingSection {...args}>{args.children}</LoadingSection>
</Template>

<Story name="Default" parameters={{jest: ['loading-section.test.ts']}} />
