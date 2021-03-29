<script lang="ts">
    import marked from 'marked/lib/marked.esm'

    // import purify from 'isomorphic-dompurify'
    export let content = ''
    export let headerIds = false
    export let toc = false
    export let tocLevels = 2
    export let enabledTags: string[] = [
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

    let renderedContent = ''

    marked.setOptions({
        smartypants: true,
        headerIds,
    })

    const creatToc = (markdown) => {
        const articles = []

        markdown = markdown.replace(/^```[\S\s]*?\n```/gmu, function (match) {
            return ''
        })

        markdown.replace(/^(#+)(.*$)/gmu, function (match, level, name) {
            level = level.length
            name = name.trim()

            articles.push({
                level: level,
                id: name
                    .toLowerCase()
                    .replace(/\W+/ug, '-')
                    .trim(),
                name: name,
            })
        })

        return articles
    }

    const tocTreeToMarkdown = (tree) => {
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
        if (toc) content = tocTreeToMarkdown(creatToc(content))
    
    // renderedContent = purify.sanitize(marked(content), {ALLOWED_TAGS: enabledTags, FORBID_ATTR: ['style']})
        renderedContent = marked(content)
    }
</script>

{@html renderedContent}
