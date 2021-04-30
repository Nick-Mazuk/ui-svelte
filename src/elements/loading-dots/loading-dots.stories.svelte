<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import LoadingDots from './loading-dots.svelte'

    const meta = {
        title: 'Elements/LoadingDots',
        component: LoadingDots,
        parameters: {
            docs: {
                description: {
                    component: 'Indicate an action running in the background.',
                },
            },
        },
        argTypes: {},
    }
</script>

<Meta {...meta} />

<Template let:args>
    <LoadingDots {...args} />
</Template>

<Story name="Default" />
