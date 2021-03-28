<script lang="ts">
    import markdown from 'markdown-it'
    export let content = ''
    export let linkify = false
    export let headerAnchors = false
    export let tableOfContents = false
    type markdownTags = 'heading' | 'paragraph' | 'list' | 'image' | 'hr' | 'blockquote' | 'code' | 'table' | 'reference' | 'html_block' | 'lheading' | 'fence' | 'text' | 'newline' | 'escape' | 'backticks' | 'strikethrough' | 'emphasis' | 'link' | 'autolink' | 'html_inline' | 'entity' | 'sub' | 'sup'
    export let enabledTags: markdownTags[] = ['heading', 'paragraph', 'list', 'image', 'hr', 'code', 'blockquote', 'text', 'backticks', 'strikethrough', 'emphasis', 'link', 'autolink', 'linkify']

    let renderedContent = ''

    $: {
        const md = markdown('zero',{
            linkify,
            typographer: true,
        }).enable(enabledTags)
    
        if (headerAnchors)
            md.use(require('markdown-it-anchor').default)
            
        if (tableOfContents)
            md.use(require('markdown-it-toc-done-right').default)
    
        const parsedContents = tableOfContents ? content + '\n\n[toc]' : content;
    
        renderedContent = md.render(parsedContents)

        if (tableOfContents)
            renderedContent = renderedContent.replace(/(.|\n)*<nav class="table-of-contents">/, '').replace('</nav>', '')
    }

</script>

{@html renderedContent}