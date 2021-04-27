<script lang="ts">
    export let href: string
</script>

<li class="my-3">
    <a sveltekit:prefetch href="{href}" class="text-gray hover:text-gray-900 transition-colors">
        <slot />
    </a>
</li>
