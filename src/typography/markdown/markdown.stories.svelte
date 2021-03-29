<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import TextContent from '../text-content/text-content.svelte'
    import Markdown from './markdown.svelte'

    const content = `# This is a header

Converts markdown into html in a safe way. Behind the scenes, this component uses markd and is sanitized with dompurify. Works great if wrapped with the \`TextContent\` component to style the output.

> Note: Currently unsafe. While it works properly, there's a bug with importing \`dompurify\` in production. Therefore, it's not being used an XSS attacks are possible if you're rendering markdown from an untrusted source.

## These are some options

This will be a link: https://example.com

**bold**

*italic*

"even quotes are curly"

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6`

    const meta = {
        title: 'Typography/Markdown',
        component: Markdown,
        parameters: {
            docs: {
                description: {
                    component: `Converts markdown into html in a safe way. Behind the scenes, this component uses \`markd\` and is sanitized with \`dompurify\`. Works great if wrapped with the \`TextContent\` component to style the output.`,
                },
            },
        },
        argTypes: {
            content: {
                control: {
                    type: 'text',
                },
                defaultValue: content,
                name: 'content',
                type: { name: 'string', required: true },
            },
            enabledTags: {
                control: {
                    type: 'array',
                },
                defaultValue: [
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'a',
                    'p',
                    'blockquote',
                    'img',
                    'code',
                    'pre',
                    'i',
                    'emphasis',
                    'b',
                    'strong',
                    'ol',
                    'ul',
                    'li',
                ],
                name: 'enabledTags',
                description: 'Whitelist html tags.',
                type: { name: 'array', required: false },
            },
            headerIds: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
                name: 'headerIds',
                description:
                    'Adds `id`s to each header, useful for linking directly to them. Especially if you create a table of contents for them.',
                type: { name: 'boolean', required: false },
            },
            toc: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
                name: 'toc',
                description:
                    'Instead of displaying the markdown, generate a table of contents based on the headers.',
                type: { name: 'boolean', required: false },
            },
            tocLevels: {
                control: {
                    type: 'number',
                },
                defaultValue: 2,
                name: 'tocLevels',
                description:
                    'The number of heading levels allowed in the table of contents. For instance, when `tocLevels` is 2, only `h1` and `h2` headings will be used for the table of contents.',
                type: { name: 'number', required: false },
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <Markdown {...args} />
</Template>

<Story name="Default" parameters="{{ jest: ['markdown.test.ts'] }}" />

<Story name="With TextContent" parameters="{{ jest: ['markdown.test.ts'] }}" let:args>
    <TextContent responsive center>
        <Markdown {...args} />
    </TextContent>
</Story>
