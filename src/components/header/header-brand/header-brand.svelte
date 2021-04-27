<script lang="ts">
    import HeaderItemWrapper from '../header-item-wrapper/header-item-wrapper.svelte'

    type Breakpoint = 'sm' | 'md' | 'none'
    export let breakpoint: Breakpoint = 'none'
    export let text: string = ''
    export let href: string = '/'
    export let image: string = ''
</script>

<a href="{href}" sveltekit:prefetch class="flex items-center space-x-2 pr-2">
    {#if image}
        <img src="{image}" class="flex-none h-10" role="presentation" alt="" />
    {/if}
    <HeaderItemWrapper breakpoint="{breakpoint}">
        <p class="h6 font-display whitespace-nowrap">{text}</p>
    </HeaderItemWrapper>
</a>
