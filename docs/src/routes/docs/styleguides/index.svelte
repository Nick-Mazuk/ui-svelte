<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async () => {
        return {
            redirect: '/docs/styleguides/color',
            status: 307,
        }
    }
</script>
