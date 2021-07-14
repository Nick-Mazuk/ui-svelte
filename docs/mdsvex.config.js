import { join } from 'path'

const config = {
    extensions: ['.svelte.md', '.md', '.svx'],
    smartypants: {
        dashes: 'oldschool',
    },
    remarkPlugins: [],
    rehypePlugins: [],
    layout: join(process.cwd(), './src/lib/components/markdown-layout.svelte'),
}

export default config
