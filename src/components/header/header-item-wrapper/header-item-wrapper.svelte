<script lang="ts">
    type Breakpoint = 'sm' | 'md' | 'none'
    export let breakpoint: Breakpoint = 'sm'

    const BREAKPOINT_MAP: Record<Breakpoint, string> = {
        none: 'flex',
        sm: 'hidden sm:flex',
        md: 'hidden md:flex',
    }
</script>

<div class="{BREAKPOINT_MAP[breakpoint]}">
    <slot />
</div>
