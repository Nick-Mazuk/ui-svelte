<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import LoadingSpinner from './loading-spinner.svelte'

    const meta = {
        title: 'Utilities/LoadingSpinner',
        component: LoadingSpinner,
        parameters: {
            docs: {
                description: {
                    component: 'For whenever there content cannot display immediately',
                },
            },
        },
        argTypes: {},
    }
</script>

<Meta {...meta} />

<Template let:args>
    <LoadingSpinner {...args} />
</Template>

<Story name="Default" parameters="{{ jest: ['loading-spinner.test.ts'] }}" />
