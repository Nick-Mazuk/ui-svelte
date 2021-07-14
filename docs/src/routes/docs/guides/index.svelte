<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async () => {
        return {
            redirect: '/docs/guides/getting-started',
            status: 307,
        }
    }
</script>
