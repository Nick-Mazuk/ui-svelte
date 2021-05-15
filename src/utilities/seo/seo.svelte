<svelte:options immutable />

<script lang="ts">
    import type { OpenGraph, Twitter } from '.'
    export let title: string
    export let siteName: string
    export let noindex = false
    export let nofollow = false
    export let description = ''
    export let keywords: string[] = []
    export let canonicalUrl = ''
    export let openGraph: OpenGraph = {}
    export let twitter: Twitter = {}

    const getTitleTagContents = () => {
        if (title && siteName) return `${title} • ${siteName}`
        if (title) return title
        if (siteName) return siteName
        return ''
    }

</script>

<svelte:head>
    <title>{getTitleTagContents()}</title>
    <meta
        name="robots"
        content="{`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`}"
    />
    <meta
        name="googlebot"
        content="{`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`}"
    />
    {#if description}
        <meta name="description" content="{description}" />
    {/if}
    {#if keywords}
        <meta name="keywords" content="{keywords.join(',')}" />
    {/if}
    <meta property="og:site_name" content="{siteName}" />
    {#if openGraph?.title}
        <meta property="og:title" content="{openGraph.title}" />
    {/if}
    {#if openGraph?.description}
        <meta property="og:description" content="{openGraph.description}" />
    {/if}
    {#if openGraph?.image}
        {#each openGraph.image instanceof Array ? openGraph.image : [openGraph.image] as image}
            {#if typeof image === 'string'}
                <meta property="og:image" content="{image}" />
            {:else}
                <meta property="og:image" content="{image.src}" />
                {#if image.width}
                    <meta property="og:image:width" content="{String(image.width)}" />
                {/if}
                {#if image.height}
                    <meta property="og:image:height" content="{String(image.height)}" />
                {/if}
                {#if image.type}
                    <meta property="og:image:type" content="{image.type}" />
                {/if}
                {#if image.alt}
                    <meta property="og:image:alt" content="{image.alt}" />
                {/if}
            {/if}
        {/each}
    {/if}
    {#if openGraph?.video}
        {#each openGraph.video instanceof Array ? openGraph.video : [openGraph.video] as video}
            <meta property="og:video" content="{video}" />
        {/each}
    {/if}
    {#if openGraph?.determiner}
        <meta property="og:determiner" content="{openGraph.determiner}" />
    {/if}
    {#if openGraph?.locale}
        <meta property="og:locale" content="{openGraph.locale}" />
    {/if}
    {#if openGraph?.url || canonicalUrl}
        <meta property="og:url" content="{openGraph?.url || canonicalUrl}" />
    {/if}
    {#if openGraph?.type}
        <meta property="og:type" content="{openGraph.type}" />
    {/if}
    {#if openGraph?.article?.publishedTime}
        <meta
            property="article:published_time"
            content="{openGraph.article.publishedTime.toISOString()}"
        />
    {/if}

    {#if openGraph?.article?.modifiedTime}
        <meta
            property="article:modified_time"
            content="{openGraph.article.modifiedTime.toISOString()}"
        />
    {/if}

    {#if openGraph?.article?.expirationTime}
        <meta
            property="article:expiration_time"
            content="{openGraph.article.expirationTime.toISOString()}"
        />
    {/if}

    {#if openGraph?.article?.section}
        <meta property="article:section" content="{openGraph.article.section}" />
    {/if}

    {#if openGraph?.article?.authors}
        {#each openGraph.article.authors as author}
            <meta property="article:author" content="{author}" />
        {/each}
    {/if}

    {#if openGraph?.article?.tags}
        {#each openGraph.article.tags as tag}
            <meta property="article:tag" content="{tag}" />
        {/each}
    {/if}
    {#if openGraph?.book?.authors}
        {#each openGraph.book.authors as author}
            <meta property="book:author" content="{author}" />
        {/each}
    {/if}
    {#if openGraph?.book?.isbn}
        <meta property="book:isbn" content="{openGraph.book.isbn}" />
    {/if}
    {#if openGraph?.book?.releaseDate}
        <meta property="book:release_date" content="{openGraph.book.releaseDate.toISOString()}" />
    {/if}
    {#if openGraph?.book?.tags}
        {#each openGraph.book.tags as tag}
            <meta property="book:tag" content="{tag}" />
        {/each}
    {/if}
    {#if openGraph?.profile?.firstName}
        <meta property="profile:first_name" content="{openGraph.profile.firstName}" />
    {/if}
    {#if openGraph?.profile?.lastName}
        <meta property="profile:last_name" content="{openGraph.profile.lastName}" />
    {/if}
    {#if openGraph?.profile?.username}
        <meta property="profile:username" content="{openGraph.profile.username}" />
    {/if}
    {#if openGraph?.profile?.gender}
        <meta property="profile:gender" content="{openGraph.profile.gender}" />
    {/if}

    {#if twitter}
        <meta name="twitter:card" content="summary_large_image" />
        {#if twitter.site}
            <meta name="twitter:site" content="{twitter.site}" />
        {/if}
        {#if twitter.title}
            <meta name="twitter:title" content="{twitter.title}" />
        {/if}
        {#if twitter.description}
            <meta name="twitter:description" content="{twitter.description}" />
        {/if}
        {#if twitter.image}
            <meta name="twitter:image" content="{twitter.image}" />
        {/if}
        {#if twitter.imageAlt}
            <meta name="twitter:image:alt" content="{twitter.imageAlt}" />
        {/if}
    {/if}
</svelte:head>
