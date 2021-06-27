<script lang="ts">
    import { FORM_SIZE_MAP } from '../../form/form-sizes'
</script>

<nav
    class="fixed bottom-0 left-0 right-0 {FORM_SIZE_MAP.large
        .height} shadow-2xl border-t bg-background flex"
>
    <slot />
</nav>
