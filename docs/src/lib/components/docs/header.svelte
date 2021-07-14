<script lang="ts">
    import Seo from '@nick-mazuk/ui-svelte/src/utilities/seo/seo.svelte'
    import Spacer from '@nick-mazuk/ui-svelte/src/utilities/spacer/spacer.svelte'

    export let title: string
    export let description: string
</script>

<Seo title="{title}" siteName="{import.meta.env.VITE_PUBLIC_SITE_NAME}" />

<h1 class="h2">{title}</h1>
<Spacer />
<p class="text-xl text-gray">{description}</p>
<Spacer y="{2}" />
