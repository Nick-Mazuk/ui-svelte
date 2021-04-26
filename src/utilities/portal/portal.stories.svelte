<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import Container from '../container/container.svelte'

    import Portal from './portal.svelte'

    const meta = {
        title: 'Utilities/Portal',
        component: Portal,
        parameters: {
            docs: {
                description: {
                    component: 'Svelte component for rendering outside the DOM of parent component',
                },
            },
        },
        argTypes: {
            center: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            x: {
                control: {
                    type: 'number',
                },
                defaultValue: 0,
            },
            y: {
                control: {
                    type: 'number',
                },
                defaultValue: 0,
            },
            overlay: {
                control: {
                    type: 'select',
                    options: [false, true, 'color'],
                },
                defaultValue: false,
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <Portal {...args} on:close="{() => alert('close event dispatched')}">
        <Container>Contents of the portal</Container>
    </Portal>
</Template>

<Story name="Default" parameters="{{ jest: ['portal.test.ts'] }}" />
