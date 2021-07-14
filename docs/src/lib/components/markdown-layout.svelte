<script lang="ts">
    import Seo from '@nick-mazuk/ui-svelte/src/utilities/seo/seo.svelte'

    export let title = ''
</script>

<Seo title="{title}" siteName="{import.meta.env.VITE_PUBLIC_SITE_NAME}" />

<div class="prose">
    <h1>{title}</h1>

    <slot />
</div>
