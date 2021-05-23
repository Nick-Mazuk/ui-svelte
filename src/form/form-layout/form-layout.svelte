<script lang="ts">
    import { setContext } from 'svelte'

    setContext('formLayout', true)

</script>

<div class="grid grid-cols-1 gap-6">
    <slot />
</div>
