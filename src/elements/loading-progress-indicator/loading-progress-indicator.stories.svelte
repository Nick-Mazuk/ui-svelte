<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import Indicator from './indicator.svelte'

    const meta = {
        title: 'Elements/LoadingProgressIndicator',
        component: Indicator,
        parameters: {
            docs: {
                description: {
                    component:
                        'Show a user that their page is loading. If the page was prefetched (so the transition is instant), this component will not show.',
                },
            },
        },
        argTypes: {},
    }
</script>

<Meta {...meta} />

<Template let:args>
    <Indicator {...args} />
</Template>

<Story name="Default" parameters="{{ jest: ['loading-progress-indicator.test.ts'] }}" />
