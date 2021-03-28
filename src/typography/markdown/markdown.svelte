<script lang="ts">
    import marked from 'marked/lib/marked.esm'
    // import purify from 'dompurify'
    export let content = ''
    export let linkify = false
    export let headerAnchors = false
    export let tableOfContents = false
    export let enabledTags: string[] = ['heading', 'paragraph', 'list', 'image', 'hr', 'code', 'blockquote', 'text', 'backticks', 'strikethrough', 'emphasis', 'link', 'autolink', 'linkify']

    let renderedContent = ''

    marked.setOptions({
        smartypants: true,
    })

    $: {
        renderedContent = marked(content)
    }

</script>

{@html renderedContent}