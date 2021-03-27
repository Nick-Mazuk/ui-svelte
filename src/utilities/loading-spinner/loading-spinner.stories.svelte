<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import LoadingSpinner from './loading-spinner.svelte'

    const meta = {
        title: 'Utilities/LoadingSpinner',
        component: LoadingSpinner,
        argTypes: {
            
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <LoadingSpinner {...args}>{args.children}</LoadingSpinner>
</Template>

<Story name="Default" parameters={{jest: ['loading-spinner.test.ts']}} />
