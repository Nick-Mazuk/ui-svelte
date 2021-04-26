<script lang="ts">
    import { setContext } from 'svelte'
    export let compact = false
    export let role: svelte.JSX.HTMLAttributes<HTMLUListElement>['role'] = ''

    setContext('compact', compact)
</script>

<ul class:py-2="{!compact && role !== 'group'}" role="{role}">
    <slot />
</ul>
