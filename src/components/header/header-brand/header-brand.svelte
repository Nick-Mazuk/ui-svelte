<script lang="ts">
    import HeaderItemWrapper from '../header-item-wrapper/header-item-wrapper.svelte'

    type Breakpoint = 'sm' | 'md' | 'none'
    export let breakpoint: Breakpoint = 'none'
    export let text = ''
    export let href = '/'
    export let image = ''
    export let ariaLabel = 'Go to homepage'
</script>

<a
    href="{href}"
    sveltekit:prefetch
    class="flex items-center space-x-2 pr-2"
    aria-label="{ariaLabel}"
>
    {#if image}
        <img src="{image}" class="flex-none h-8" role="presentation" alt="" />
    {/if}
    <HeaderItemWrapper breakpoint="{breakpoint}">
        <p class="h6 font-display whitespace-nowrap">{text}</p>
    </HeaderItemWrapper>
</a>
