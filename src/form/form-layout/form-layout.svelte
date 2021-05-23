<script lang="ts">
    import { setContext } from 'svelte'

    import type { FormItemSize } from '../form-sizes'
    import { INPUT_LAYOUT_SIZE_MAP } from '../form-sizes'

    export let size: FormItemSize = 'default'

    setContext('formLayout', true)

</script>

<div class="grid grid-cols-1 {INPUT_LAYOUT_SIZE_MAP[size]}">
    <slot />
</div>
