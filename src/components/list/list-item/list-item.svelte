<script lang="ts">
    import { getContext } from 'svelte'

    export let href = ''

    const compact = getContext('compact')

    const classes = {
        container: [
            'list-none h-10 text-gray-700 items-center flex cursor-pointer hover:bg-gray-50 hover:text-gray-900 group',
            compact ? 'px-3' : 'px-4',
        ].join(' '),
        content: 'truncate',
        affix: {
            default: 'flex text-gray group-hover:text-gray-900',
            prefix: 'w-5 mr-3',
            suffix: 'w-8 pl-3 ml-auto',
        },
    }
</script>

{#if href}
    <a href="{href}" sveltekit:prefetch class="{classes.container}">
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
    <li class="{classes.container}">
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
