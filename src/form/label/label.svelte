<script lang="ts">
    import { getContext, setContext } from 'svelte'
    import { writable } from 'svelte/store'
    import type { FormLayoutContext } from '../form-layout'

    export let value = ''
    export let ariaLabel = ''
    export let readonly = false
    export let optional = false
    export let hideOptionalLabel = false

    setContext('label', writable(value))

    const formLayoutContext = getContext<FormLayoutContext>('formLayout')

    $: formLayoutClasses = formLayoutContext ? '-mt-2 first:mt-0' : ''

</script>

<!-- svelte-ignore a11y-label-has-associated-control -- input will be inside the slot -->
<label class="flex flex-col space-y-1 {formLayoutClasses}" on:mouseup>
    {#if ariaLabel}
        <span class="sr-only">{ariaLabel}</span>
    {/if}
    {#if value}
        <div class="flex items-baseline justify-between space-x-2">
            <div class="font-bold">{value}</div>
            {#if readonly || (optional && !hideOptionalLabel)}
                <span class="text-gray-700 text-sm">({readonly ? 'readonly' : 'optional'})</span>
            {/if}
        </div>
    {/if}
    <slot />
</label>
