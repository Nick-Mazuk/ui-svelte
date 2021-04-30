<script>
    import { Meta, Story } from '@storybook/addon-svelte-csf'

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

<Story name="Vertical" let:args>
    <section class="wrapper">
        <div class="rounded-lg bg-gray-200 h-16"></div>
        <Spacer {...args} />
        <div class="rounded-lg bg-gray-200 h-16"></div>
    </section>
</Story>
<Story name="Horizontal" let:args>
    <section class="wrapper flex">
        <div class="rounded-lg bg-gray-200 w-full h-16"></div>
        <Spacer {...args} />
        <div class="rounded-lg bg-gray-200 w-full h-16"></div>
    </section>
</Story>
