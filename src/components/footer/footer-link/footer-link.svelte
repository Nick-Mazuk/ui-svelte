<script lang="ts">
    export let href: string
</script>

<li class="my-3">
    <a
        sveltekit:prefetch
        href="{href}"
        class="text-gray-600 hover:text-gray-900 transition-colors"
        data-test="footer-link"
    >
        <slot />
    </a>
</li>
