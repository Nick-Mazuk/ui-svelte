<script lang="ts">
    import { FORM_SIZE_MAP } from '../../form-sizes'
    import type { FormItemSize } from '../../form-sizes'

    import Tooltip from '../../../components/tooltip/tooltip.svelte'

    export let content: string | Function
    export let buttonProps: { label: string; onClick: () => void } | undefined
    export let disabled: boolean
    export let placement: 'prefix' | 'suffix'
    export let size: FormItemSize
    export let isInvalid: boolean

    const getAffixClasses = (isButton: boolean, invalid: boolean) => {
        const classes = ['self-stretch flex items-center whitespace-nowrap flex-none bg-opacity-0']
        if (disabled) classes.push('cursor-pointer')
        else if (isButton)
            classes.push(
                'cursor-pointer focus:outline-none hover:bg-opacity-10 focus:bg-opacity-20'
            )
        else classes.push('cursor-text')

        if (invalid) classes.push('bg-error focus:text-error-700')
        else classes.push('bg-gray focus:bg-primary focus:text-primary-700')
        return classes.join(' ')
    }
    $: padding =
        placement === 'prefix'
            ? FORM_SIZE_MAP[size].affix.paddingPrefix
            : FORM_SIZE_MAP[size].affix.paddingSuffix
</script>

{#if buttonProps}
    <Tooltip placement="{placement === 'prefix' ? 'right' : 'left'}" value="{buttonProps.label}">
        <button
            class="{padding} {getAffixClasses(true, isInvalid)}"
            on:click="{buttonProps.onClick}"
            disabled="{disabled}"
            slot="trigger"
            aria-label="{buttonProps.label}"
        >
            {#if typeof content === 'string'}
                <span class="{FORM_SIZE_MAP[size].textSize}">{content}</span>
            {:else}
                <svelte:component this="{content}" size="{FORM_SIZE_MAP[size].affix.icon}" />
            {/if}
        </button>
        <span>{buttonProps.label}</span>
    </Tooltip>
{:else}
    <div class="{padding} {getAffixClasses(false, isInvalid)}">
        {#if typeof content === 'string'}
            <span class="{FORM_SIZE_MAP[size].textSize}">{content}</span>
        {:else}
            <svelte:component this="{content}" size="{FORM_SIZE_MAP[size].affix.icon}" />
        {/if}
    </div>
{/if}
