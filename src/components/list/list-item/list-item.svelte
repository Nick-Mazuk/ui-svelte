<script lang="ts">
    import { getContext, onMount } from 'svelte'

    export let href = ''

    let element: HTMLAnchorElement | HTMLLIElement
    let index: number = -1
    let textContent: string | null

    const compact = getContext<boolean>('compact')
    const register = getContext<(text: string | null) => number>('registerListItem')

    onMount(() => {
        textContent = element.textContent
        index = register(textContent)
    })

    const classes = {
        container: [
            'list-none h-10 text-gray-700 items-center flex cursor-pointer transition-colors hover:bg-gray-100 hover:text-gray-900 group',
            compact ? 'px-3' : 'px-4',
        ].join(' '),
        content: 'truncate',
        affix: {
            default: 'flex text-gray group-hover:text-gray-900',
            prefix: 'w-5 mr-3',
            suffix: 'w-8 pl-3 ml-auto',
        },
    }

    $: tabindex = index === 0 ? 0 : -1
</script>

{#if href}
    <a
        href="{href}"
        sveltekit:prefetch
        class="{classes.container}"
        bind:this="{element}"
        tabindex="{tabindex}"
    >
        {#if $$slots.prefix}
            <div class="{classes.affix.default} {classes.affix.prefix}">
                <slot name="prefix" />
            </div>
        {/if}
        <div class="{classes.content}">
            <slot />
        </div>
        {#if $$slots.suffix}
            <div class="{classes.affix.default} {classes.affix.suffix}">
                <slot name="suffix" />
            </div>
        {/if}
    </a>
{:else}
    <li class="{classes.container}" bind:this="{element}" tabindex="{tabindex}">
        {#if $$slots.prefix}
            <div class="{classes.affix.default} {classes.affix.prefix}">
                <slot name="prefix" />
            </div>
        {/if}
        <div class="{classes.content}">
            <slot />
        </div>
        {#if $$slots.suffix}
            <div class="{classes.affix.default} {classes.affix.suffix}">
                <slot name="suffix" />
            </div>
        {/if}
    </li>
{/if}
