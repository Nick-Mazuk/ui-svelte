<script lang="ts">
    import HeaderItemWrapper from '../header-item-wrapper/header-item-wrapper.svelte'

    type Breakpoint = 'sm' | 'md' | 'none'
    export let breakpoint: Breakpoint = 'none'
    export let text: string = ''
    export let href: string = '/'
    export let image: string = ''
</script>

<a href="{href}" class="flex items-center space-x-2 pr-2">
    {#if image}
        <img src="{image}" alt="{text}" class="flex-none h-10" />
    {/if}
    <HeaderItemWrapper breakpoint="{breakpoint}">
        <p class="h6 font-display whitespace-nowrap">{text}</p>
    </HeaderItemWrapper>
</a>
