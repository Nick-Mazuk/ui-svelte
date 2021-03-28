<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import Markdown from './markdown.svelte'

    import TextContent from '../text-content/text-content.svelte'

    const content = `# This is a header

Converts markdown into html in a safe way. Behind the scenes, this component uses markd and is sanitized with dompurify. Works great if wrapped with the \`TextContent\` component to style the output.

## These are some options

With \`linkify\`, this will be a link: https://example.com

**bold**

*italic*

"even quotes are curly"`
    
    const meta = {
        title: 'Typography/Markdown',
        component: Markdown,
        parameters: {
            docs: {
                description: {
                    component: `Converts markdown into html in a safe way. Behind the scenes, this component uses \`markd\` and is sanitized with \`dompurify\`. Works great if wrapped with the \`TextContent\` component to style the output.`
                }
            }
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
                defaultValue: ['heading', 'paragraph', 'list', 'image', 'hr', 'code', 'blockquote', 'text', 'backticks', 'strikethrough', 'emphasis', 'link', 'autolink', 'linkify'],
                name: 'enabledTags',
                description: 'Whitelist html tags. Options available: `heading`, `paragraph`, `list`, `image`, `hr`, `blockquote`, `code`, `table`, `reference`, `html_block`, `lheading`, `fence`, `text`, `newline`, `escape`, `backticks`, `strikethrough`, `emphasis`, `link`, `autolink`, `html_inline`, `entity`, `sub`, `sup`',
                type: { name: 'array', required: false },
            },
            linkify: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
                name: 'linkify',
                description: 'Automatically wrap `<a>` tags around links, even if no `<a>` tag was present.',
                type: { name: 'boolean', required: false },
            },
            headerAnchors: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
                name: 'headerAnchors',
                description: 'Adds `id`s to each header, useful for linking directly to them.',
                type: { name: 'boolean', required: false },
            },
            tableOfContents: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
                name: 'tableOfContents',
                description: 'Instead of displaying the markdown, generate a table of contents based on the headers.',
                type: { name: 'boolean', required: false },
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <Markdown {...args}></Markdown>
</Template>

<Story name="Default" parameters={{jest: ['markdown.test.ts']}} />

<Story name="With TextContent" parameters={{jest: ['markdown.test.ts']}} let:args>
    <TextContent responsive center>
        <Markdown {...args}></Markdown>
    </TextContent>
</Story> 
