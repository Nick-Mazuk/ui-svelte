<script lang="ts">
    import marked from 'marked/lib/marked.esm'
    import dompurify from 'dompurify'
    export let content = ''
    export let linkify = false
    export let headerIds = false
    export let toc = false
    export let tocLevels = 2
    export let enabledTags: string[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'p', 'blockquote', 'img', 'code', 'pre', 'i', 'emphasis', 'b', 'strong', 'ol', 'ul', 'li']

    const purify = dompurify()

    let renderedContent = ''

    marked.setOptions({
        smartypants: true,
        headerIds,
    })

    const creatToc = (markdown) => {
        var articles = []

        markdown = markdown.replace(/^```[\s\S]*?\n```/gm, function (match) {
            return ''
        })

        markdown.replace(/^(#+)(.*$)/gm, function (match, level, name) {
            level = level.length
            name = name.trim()

            articles.push({
                level: level,
                id: name.toLowerCase().replace(/[^\w]+/g, '-').trim(),
                name: name,
            })
        })

        return articles
    }

    const tocTreeToMarkdown = (tree) => {
        let result = ''

        tree.forEach((item) => {
            if (item.level > tocLevels) return
            result += new Array((item.level - 1) * 4).join(' ') + ' '
            result += `- [${item.name}](#${item.id})`
            result += '\n'
        })

        return result
    }

    $: {
        if(toc)
            content = tocTreeToMarkdown(creatToc(content))
        renderedContent = purify.sanitize(marked(content), {ALLOWED_TAGS: enabledTags, FORBID_ATTR: ['style']})
    }

</script>

{@html renderedContent}
