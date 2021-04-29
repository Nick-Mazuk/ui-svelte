<script>
    import { Meta, Story } from '@storybook/addon-svelte-csf'
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
                description: 'X position of the portal relative to the page in pixels.',
            },
            y: {
                control: {
                    type: 'number',
                },
                defaultValue: 0,
                description: 'Y position of the portal relative to the page in pixels.',
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

<Story name="Default" parameters="{{ jest: ['portal.test.ts'] }}" let:args>
    <Portal {...args} on:close="{() => alert('close event dispatched')}">
        <Container>Contents of the portal</Container>
    </Portal>
</Story>
<Story name="Center" parameters="{{ jest: ['portal.test.ts'] }}" args="{{ center: true }}" let:args>
    <Portal {...args} on:close="{() => alert('close event dispatched')}">
        <Container>Contents of the portal</Container>
    </Portal>
</Story>
<Story
    name="Overlay"
    parameters="{{ jest: ['portal.test.ts'] }}"
    args="{{ overlay: true }}"
    let:args
>
    <Portal {...args} on:close="{() => alert('close event dispatched')}">
        <Container>Contents of the portal</Container>
    </Portal>
</Story>
<Story
    name="Overlay color"
    parameters="{{ jest: ['portal.test.ts'] }}"
    args="{{ overlay: 'color' }}"
    let:args
>
    <Portal {...args} on:close="{() => alert('close event dispatched')}">
        <Container>Contents of the portal</Container>
    </Portal>
</Story>
<Story
    name="Coordinates"
    parameters="{{ jest: ['portal.test.ts'] }}"
    args="{{ x: 256, y: 128 }}"
    let:args
>
    <Portal {...args} on:close="{() => alert('close event dispatched')}">
        <Container>Contents of the portal</Container>
    </Portal>
</Story>
