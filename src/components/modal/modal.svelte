<script lang="ts">
    import Portal from '../../utilities/portal/portal.svelte'
    import Container from '../../utilities/container/container.svelte'
    import Button from '../../elements/button/button.svelte'
    import X from '../../elements/icon/x.svelte'
    import Check from '../../elements/icon/check.svelte'

    type Variant = 'default' | 'success'
    type Size = 'small' | 'default' | 'large'

    export let title: string
    export let description = ''
    export let close = true
    export let confirmText = ''
    export let cancelText = ''
    export let variant: Variant = 'default'
    export let size: Size | undefined = undefined

    const SIZE_MAP: Record<Size, string> = {
        small: '!max-w-md',
        default: '!max-w-lg',
        large: '!max-w-2xl',
    }

    let buttonWidth: 'full' | undefined
    $: buttonWidth = variant === 'success' ? 'full' : undefined
    $: descriptionClasses =
        variant === 'success' ? 'text-center mt-2 text-gray-700 text-balance' : ''
    $: buttonContainerClasses = variant === 'success' ? 'flex-1' : 'flex-shrink-0'
    let displaySize: Size
    $: {
        if (size) displaySize = size
        else if (variant === 'success') displaySize = 'small'
        else displaySize = 'default'
    }

</script>

<Portal overlay="color" center>
    <div
        class="py-8 w-full {SIZE_MAP[displaySize]} wrapper flex items-center h-screen"
        role="alertdialog"
        aria-labelledby="modal-title"
        aria-describedby="{description ? 'modal-description' : undefined}"
    >
        <Container
            variant="shadow"
            class="bg-background max-h-full w-full relative flex flex-col space-y-4"
        >
            {#if variant === 'success'}
                <div class="flex justify-center">
                    <div
                        class="h-12 w-12 rounded-full bg-success-200 text-success-700 flex items-center justify-center"
                    >
                        <Check size="{6}" />
                    </div>
                </div>
            {/if}
            <div
                class="flex flex-none"
                class:justify-between="{variant !== 'success'}"
                class:justify-center="{variant === 'success'}"
            >
                <div>
                    <h3
                        class:h4="{variant !== 'success'}"
                        class:h5="{variant === 'success'}"
                        id="modal-title"
                        class:text-center="{variant === 'success'}"
                    >
                        {title}
                    </h3>
                    {#if description}
                        <p id="modal-description" class="{descriptionClasses}">
                            {description}
                        </p>
                    {/if}
                </div>
                {#if close && variant !== 'success'}
                    <div class="pr-1 pt-1 flex-none">
                        <Button shape="circle" variant="static" glue="{['right', 'top']}">
                            <X />
                        </Button>
                    </div>
                {/if}
            </div>
            {#if $$slots.default}
                <div class="overflow-scroll">
                    <slot />
                </div>
            {/if}
            {#if $$slots.actions || confirmText}
                <div class="flex justify-end flex-none">
                    {#if $$slots.actions && variant !== 'success'}
                        <slot name="actions" />
                    {:else}
                        <div
                            class="flex space-x-4"
                            class:w-full="{variant === 'success'}"
                            class:mt-2="{variant === 'success'}"
                        >
                            {#if cancelText}
                                <div class="{buttonContainerClasses}">
                                    <Button variant="secondary" width="{buttonWidth}">
                                        {cancelText}
                                    </Button>
                                </div>
                            {/if}
                            <div class="{buttonContainerClasses}">
                                <Button width="{buttonWidth}">
                                    {confirmText}
                                </Button>
                            </div>
                        </div>
                    {/if}
                </div>
            {/if}
        </Container>
    </div>
</Portal>
