<script lang="ts">
    import { setContext } from 'svelte'
    export let compact = false
    export let role: svelte.JSX.HTMLAttributes<HTMLUListElement>['role'] = ''

    let listItems: (string | null)[] = []

    const registerListItem = (text: string | null): number => {
        listItems = [...listItems, text]
        return listItems.length - 1
    }

    setContext('compact', compact)
    setContext('registerListItem', registerListItem)
</script>

<ul class:py-2="{!compact && role !== 'group'}" role="{role}">
    <slot />
</ul>
