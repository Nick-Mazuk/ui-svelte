<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import TableOfContents from './table-of-contents.svelte'

    const meta = {
        title: 'Navigation/TableOfContents',
        component: TableOfContents,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            currentItem: {
                control: {
                    type: 'select',
                    options: [
                        '/item-1',
                        '/item-2',
                        '/item-3',
                        '/item-3/subitem',
                        '/item-3/subitem-2',
                        '/item-4',
                        '/item-4/subitem',
                    ],
                },
                name: 'currentItem',
                defaultValue: '/item-1',
                type: { name: 'string', required: true },
            },
            items: {
                control: {
                    type: 'object',
                },
                name: 'items',
                defaultValue: [
                    { href: '/item-1', text: 'Item 1' },
                    { href: '/item-2', text: 'Item 2' },
                    {
                        href: '/item-3',
                        text: 'Item 3',
                        children: [
                            { href: '/item-3/subitem', text: 'Sub item' },
                            { href: '/item-3/subitem-2', text: 'Sub item 2' },
                        ],
                    },
                    {
                        href: '/item-4',
                        text: 'Item 4',
                        children: [{ href: '/item-4/subitem', text: 'Sub item' }],
                    },
                ],
                type: { name: 'string', required: true },
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <TableOfContents {...args} />
</Template>

<Story name="Default" parameters="{{ jest: ['table-of-contents.test.ts'] }}" />
