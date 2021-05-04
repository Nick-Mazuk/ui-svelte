<script lang="ts">
    export let href: string
    export let title: string
</script>

<a
    href="{href}"
    class="text-gray-400 flex w-6 transition-colors hover:text-gray-700"
    title="{title}"
    target="_blank"
    rel="noreferrer"
>
    <slot />
</a>
