<script>
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import Http404 from './http-404.svelte'

    const meta = {
        title: 'Layouts/Http404',
        component: Http404,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            kicker: {
                control: {
                    type: 'text',
                },
                name: 'kicker',
                defaultValue: 'Oops…',
                type: { name: 'string', required: false },
            },
            title: {
                control: {
                    type: 'text',
                },
                name: 'title',
                defaultValue: 'This is awkward',
                type: { name: 'string', required: false },
            },
            message: {
                control: {
                    type: 'text',
                },
                name: 'message',
                defaultValue: "Looks like the page you're looking for doesn't exist.",
                type: { name: 'string', required: false },
            },
            links: {
                control: {
                    type: 'array',
                },
                description:
                    'An array of suggested links, here each item is an object with an `href` and `text` value.',
                name: 'links',
                type: { name: 'string', required: false },
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" parameters="{{ jest: ['http-404.test.ts'] }}" let:args>
    <Http404 {...args} />
</Story>
<Story
    name="Links"
    parameters="{{ jest: ['http-404.test.ts'] }}"
    args="{{
        links: [
            { href: '#', text: 'Home' },
            { href: '#', text: 'Docs' },
            { href: '#', text: 'Help' },
        ],
    }}"
    let:args
>
    <Http404 {...args} />
</Story>
