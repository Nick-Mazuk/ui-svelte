<script lang="ts">
    import HeaderItemWrapper from '../header-item-wrapper/header-item-wrapper.svelte'
    import { page } from '$app/stores'

    type Breakpoint = 'sm' | 'md' | 'none'
    export let breakpoint: Breakpoint = 'sm'
    export let href: string

    $: isCurrentPath = $page.path.includes(href)
</script>

<HeaderItemWrapper breakpoint="{breakpoint}">
    <a
        href="{href}"
        class="flex items-center hover:text-current transition-color text-sm whitespace-nowrap {isCurrentPath
            ? 'text-current text-semibold'
            : 'text-gray-600'}"
    >
        <slot />
    </a>
</HeaderItemWrapper>
