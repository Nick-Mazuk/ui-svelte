<script>
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import Container from './container.svelte'

    const meta = {
        title: 'Utilities/Container',
        component: Container,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            padding: {
                control: {
                    type: 'select',
                    options: [0, 1, 2, 4, 6, 8, 12, 16, true, false],
                },
                defaultValue: 6,
            },
            rounded: {
                control: {
                    type: 'select',
                    options: ['none', 'small', 'default', 'large', 'larger'],
                },
                defaultValue: 'default',
            },
            variant: {
                control: {
                    type: 'select',
                    options: ['border', 'shadow', 'click', 'fill', 'disable'],
                },
            },
            href: {
                control: {
                    type: 'text',
                },
            },
            class: {
                control: {
                    type: 'text',
                },
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <Container {...args}>This is some content</Container>
</Story>
<Story name="Variants" let:args>
    <main class="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        <Container {...args} variant="border">border</Container>
        <Container {...args} variant="shadow">shadow</Container>
        <Container {...args} variant="click">click</Container>
        <Container {...args} variant="fill">fill</Container>
        <Container {...args} variant="disable">disable</Container>
    </main>
</Story>
<Story name="Rounded" let:args>
    <main class="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        <Container {...args} rounded="none" variant="fill">none</Container>
        <Container {...args} rounded="small" variant="fill">small</Container>
        <Container {...args} rounded="default" variant="fill">default</Container>
        <Container {...args} rounded="large" variant="fill">large</Container>
        <Container {...args} rounded="larger" variant="fill">larger</Container>
    </main>
</Story>
<Story name="Padding" let:args>
    <main class="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        <div><Container {...args} padding="none" variant="fill">none</Container></div>
        <div><Container {...args} padding="smallest" variant="fill">smallest</Container></div>
        <div><Container {...args} padding="smaller" variant="fill">smaller</Container></div>
        <div><Container {...args} padding="small" variant="fill">small</Container></div>
        <div><Container {...args} padding="default" variant="fill">default</Container></div>
        <div><Container {...args} padding="large" variant="fill">large</Container></div>
        <div><Container {...args} padding="larger" variant="fill">larger</Container></div>
        <div><Container {...args} padding="largest" variant="fill">largest</Container></div>
        <div><Container {...args} padding variant="fill">true—uses default padding</Container></div>
        <div><Container {...args} padding="{false}" variant="fill">false</Container></div>
    </main>
</Story>
<Story
    name="Custom classes"
    args="{{
        class:
            'h-64 flex items-center justify-center h4 bg-primary text-background border-none hover:bg-gradient-to-r hover:from-accent-magenta hover:to-error transition-colors',
    }}"
    let:args
>
    <main class="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        <Container {...args}>This is some content</Container>
    </main>
</Story>
