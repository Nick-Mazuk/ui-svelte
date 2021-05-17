<script lang="ts">
    import { createEventDispatcher, getContext } from 'svelte'

    import Label from '../../label/label.svelte'
    import User from '../../../elements/icon/user.svelte'
    import { formatNumber } from '@nick-mazuk/lib/esm/number-styling'
    import type { FormSync } from '../..'
    import type { AvatarInputDispatcher } from '.'

    export let ariaLabel = 'Avatar'
    export let name = 'avatar'
    export let maxFileSize: number | undefined = undefined
    export let readonly = false
    export let disabled = false
    export let optional = false
    export let requiredMessage = 'Select an image to upload'

    let files: FileList | undefined
    let fileReader: FileReader | undefined
    let previewBlob: string | undefined
    let errorMessage = ''
    let showError = false
    const dispatch = createEventDispatcher<AvatarInputDispatcher>()
    const formSync = getContext<FormSync>('formSync')
    if (typeof window !== 'undefined') {
        fileReader = new FileReader()
        fileReader.addEventListener('load', (event) => {
            const result = event.target?.result
            if (typeof result === 'string' || typeof result === 'undefined') previewBlob = result
        })
    }

    const handleChange: svelte.JSX.FormEventHandler<HTMLInputElement> = (event) =>
        event.currentTarget.blur()

    $: if (formSync) {
        formSync.updateForm(
            name,
            files?.[0] || '',
            () => {
                showError = true
                return errorMessage === ''
            },
            () => true
        )
    }
    $: if (files && files[0]) {
        fileReader?.readAsDataURL(files[0])
        showError = true
    }
    $: {
        const file = files?.[0]
        let tempErrorMessage = ''
        if (!file && !optional) tempErrorMessage = requiredMessage
        else if (file && maxFileSize && file.size / (1024 * 1024) > maxFileSize)
            tempErrorMessage = `Image must be under ${formatNumber(maxFileSize)} MB`

        errorMessage = tempErrorMessage
    }
    $: isInvalidState = errorMessage !== '' && showError && !readonly
    $: dispatch('error', {
        isValid: !isInvalidState,
        errorMessage,
    })

</script>

<div class="inline-block">
    <Label ariaLabel="{ariaLabel}">
        <div
            class="hidden sm:block relative flex-none w-24 h-24 w-full h-full cursor-pointer rounded-full overflow-hidden transition filter hover:brightness-90 focus-within:brightness-75"
        >
            {#if typeof previewBlob === 'string'}
                <img
                    src="{previewBlob}"
                    alt=""
                    class="w-full h-full object-cover absolute"
                    class:grayscale="{disabled}"
                />
            {:else}
                <div
                    class="flex flex-col items-center justify-center w-full h-full text-gray"
                    class:bg-gray-200="{!disabled}"
                    class:bg-gray-100="{disabled}"
                    class:border-r="{disabled}"
                >
                    <User size="{6}" />
                </div>
            {/if}
            <input
                type="file"
                name="{name}"
                class="sr-only"
                accept="image/png, image/jpeg"
                required="{!optional}"
                readonly="{readonly}"
                disabled="{disabled || readonly}"
                aria-invalid="{isInvalidState}"
                on:change="{handleChange}"
                bind:files
            />
        </div>
    </Label>
</div>
