<script lang="ts">
    export let href: string
    export let title: string
</script>

<a href="{href}" class="hover:text-gray-700 transition-colors text-gray-400" title="{title}">
    <slot />
</a>
