<script lang="ts">
    import marked from 'marked/lib/marked.esm'

    export let content = ''
    export let headerIds = false
    export let toc = false
    export let tocLevels = 2
    export const enabledTags: string[] = [
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
    ]

    type TocTreeItem = { id: string; name: string; level: number }
    type TocTree = TocTreeItem[]

    let renderedContent = ''

    marked.setOptions({
        smartypants: true,
        headerIds,
    })

    const createToc = (input: string) => {
        const articles: TocTree = []

        const markdown = input.replace(/^```[\S\s]*?\n```/gmu, '')

        markdown.replace(/^(#+)(.*$)/gmu, (match, levelString, nameString) => {
            const level = levelString.length
            const name = nameString.trim()

            articles.push({
                level,
                id: name.toLowerCase().replace(/\W+/gu, '-').trim(),
                name,
            })

            return match
        })

        return articles
    }

    const tocTreeToMarkdown = (tree: TocTree) => {
        let result = ''

        tree.forEach((item) => {
            if (item.level > tocLevels) return
            result += `${new Array((item.level - 1) * 4).join(' ')} `
            result += `- [${item.name}](#${item.id})`
            result += '\n'
        })

        return result
    }

    $: {
        if (toc) content = tocTreeToMarkdown(createToc(content))

        // renderedContent = purify.sanitize(marked(content), {ALLOWED_TAGS: enabledTags, FORBID_ATTR: ['style']})
        renderedContent = marked(content)
    }
</script>

{@html renderedContent}
