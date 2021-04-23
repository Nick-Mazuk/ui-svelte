<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import Spacer from './spacer.svelte'

    const meta = {
        title: 'Utilities/Spacer',
        component: Spacer,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            y: {
                control: {
                    type: 'number',
                },
                name: 'y',
                type: { name: 'number', required: false },
            },
            x: {
                control: {
                    type: 'number',
                },
                name: 'x',
                type: { name: 'number', required: false },
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <section class="wrapper">
        <div class="rounded-lg bg-gray-200 h-16"></div>
        <Spacer {...args} />
        <div class="rounded-lg bg-gray-200 h-16"></div>
    </section>
</Template>

<Story name="Default" parameters="{{ jest: ['spacer.test.ts'] }}" />
