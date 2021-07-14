import type { TocItems } from '@nick-mazuk/ui-svelte/src/components/table-of-contents'

export const tableOfContents: TocItems = [
    {
        text: 'Guides',
        href: '/docs/guides',
        children: [
            {
                text: 'Getting started',
                href: '/docs/guides/getting-started',
            },
        ],
    },
    {
        text: 'Styleguide',
        href: '/docs/styleguides',
        children: [
            {
                text: 'Color',
                href: '/docs/styleguides/color',
            },
            {
                text: 'Icons',
                href: '/docs/styleguides/icons',
            },
        ],
    },
]
