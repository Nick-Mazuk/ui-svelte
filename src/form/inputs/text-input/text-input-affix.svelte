<script lang="ts">
    import Tooltip from '../../../components/tooltip/tooltip.svelte'

    export let content: string | Function
    export let buttonProps: { label: string; onClick: () => void } | undefined
    export let disabled: boolean
    export let placement: 'prefix' | 'suffix'

    const getAffixClasses = (isButton: boolean) => {
        const classes = [
            'self-stretch flex items-center whitespace-nowrap flex-none bg-gray bg-opacity-0',
        ]
        if (disabled) classes.push('cursor-pointer')
        else if (isButton)
            classes.push(
                'cursor-pointer focus:outline-none focus:bg-primary hover:bg-opacity-10 focus:bg-opacity-20 focus:text-primary-700'
            )
        else classes.push('cursor-text')
        return classes.join(' ')
    }
    $: padding = placement === 'prefix' ? 'pl-3 pr-2' : 'pl-2 pr-3'
</script>

{#if buttonProps}
    <Tooltip placement="{placement === 'prefix' ? 'right' : 'left'}" value="{buttonProps.label}">
        <button
            class="{padding} {getAffixClasses(true)}"
            on:click="{buttonProps.onClick}"
            disabled="{disabled}"
            slot="trigger"
            aria-label="{buttonProps.label}"
        >
            {#if typeof content === 'string'}
                <span>{content}</span>
            {:else}
                <svelte:component this="{content}" size="{5}" />
            {/if}
        </button>
        <span>{buttonProps.label}</span>
    </Tooltip>
{:else}
    <div class="{padding} {getAffixClasses(false)}">
        {#if typeof content === 'string'}
            <span>{content}</span>
        {:else}
            <svelte:component this="{content}" size="{5}" />
        {/if}
    </div>
{/if}
