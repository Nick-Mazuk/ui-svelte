<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import Header from '../header.svelte'

    import HeaderItemWrapper from './header-item-wrapper.svelte'

    const meta = {
        title: 'Components/Header/HeaderItemWrapper',
        component: HeaderItemWrapper,
        parameters: {
            docs: {
                description: {
                    component:
                        'Used to wrap all items in the header, inlcuding non-header components (e.g., buttons).',
                },
            },
        },
        argTypes: {
            center: {
                control: {
                    type: 'boolean',
                },
                defaultValue: true,
                description: 'Center the contents vertically',
            },
            breakpoint: {
                control: {
                    type: 'radio',
                    options: ['sm', 'md', 'none'],
                },
                defaultValue: 'sm',
                description:
                    'Only shows the contents above the breakpoint. Equivalent to using responsive utilities in Tailwind.',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" parameters="{{ jest: ['header-item-wrapper.test.ts'] }}" let:args>
    <Header>
        <HeaderItemWrapper {...args} slot="left">Some text</HeaderItemWrapper>
    </Header>
</Story>
<Story name="Breakpoints" parameters="{{ jest: ['header-item-wrapper.test.ts'] }}" let:args>
    <Header>
        <svelte:fragment slot="left">
            <HeaderItemWrapper {...args} breakpoint="none">breakpoint='none'</HeaderItemWrapper>
            <HeaderItemWrapper {...args} breakpoint="sm">breakpoint='sm'</HeaderItemWrapper>
            <HeaderItemWrapper {...args} breakpoint="md">breakpoint='md'</HeaderItemWrapper>
        </svelte:fragment>
    </Header>
</Story>
