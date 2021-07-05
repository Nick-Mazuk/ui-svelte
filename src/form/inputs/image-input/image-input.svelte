<script lang="ts">
    import { getContext } from 'svelte'

    import Label from '../../label/label.svelte'
    import Upload from '../../../elements/icon/upload.svelte'
    import Image from '../../../elements/icon/image.svelte'
    import { formatNumber } from '@nick-mazuk/lib/esm/number-styling'
    import { endWithPunctuation, slugify } from '@nick-mazuk/lib/esm/text-styling'
    import type { FormSync } from '../..'
    import InputFeedbackSection from '../text-input/_input-feedback-section.svelte'

    type AspectRatio = '1x1' | '4x3' | '3x2' | '16x9' | '2x1'
    type Variant = 'default' | 'full' | 'nopreview'

    export let label = 'Image'
    let nameProp = ''
    export { nameProp as name }
    export let aspectRatio: AspectRatio = '3x2'
    let helpTextProp = ''
    export { helpTextProp as helpText }
    export let maxFileSize: number | undefined = undefined
    export let readonly = false
    export let disabled = false
    export let optional = false
    export let hideOptionalLabel = false
    export let requiredMessage = 'Select an image to upload'
    export let variant: Variant = 'default'

    type RatioStyle = {
        width: string
        ratio: string
    }
    const RATIO_MAP: Record<AspectRatio, RatioStyle> = {
        '1x1': { width: 'w-32', ratio: 'aspect-w-1 aspect-h-1' },
        '4x3': { width: 'w-40', ratio: 'aspect-w-4 aspect-h-3' },
        '3x2': { width: 'w-48', ratio: 'aspect-w-3 aspect-h-2' },
        '16x9': { width: 'w-56', ratio: 'aspect-w-16 aspect-h-9' },
        '2x1': { width: 'w-64', ratio: 'aspect-w-2 aspect-h-1' },
    }

    type VariantStyle = {
        preview: string
        dropzone: string
    }
    let VARIANT_MAP: Record<Variant, VariantStyle>
    $: VARIANT_MAP = {
        default: {
            preview: `hidden sm:block relative flex-none ${RATIO_MAP[aspectRatio].width} h-32`,
            dropzone: 'flex flex-col w-full justify-center items-center py-4 px-2 h-32',
        },
        nopreview: {
            preview: `hidden`,
            dropzone: 'flex flex-col w-full justify-center items-center py-4 px-2 h-32',
        },
        full: {
            preview: `w-full ${RATIO_MAP[aspectRatio].ratio}`,
            dropzone: 'hidden',
        },
    }

    let files: FileList | undefined
    let fileReader: FileReader | undefined
    let previewBlob: string | undefined
    let errorMessage = ''
    let showError = false
    const formSync = getContext<FormSync>('formSync')
    if (typeof window !== 'undefined') {
        fileReader = new FileReader()
        fileReader.addEventListener('load', (event) => {
            const result = event.target?.result
            if (typeof result === 'string' || typeof result === 'undefined') previewBlob = result
        })
    }

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
    $: if (files?.[0]) {
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
    let helpText = ''
    $: {
        const feedback = maxFileSize ? `Maximum file size is ${formatNumber(maxFileSize)} MB` : ''
        if (helpTextProp && feedback)
            helpText = `${endWithPunctuation(helpTextProp, '.')} ${feedback}.`
        else if (helpTextProp) helpText = helpTextProp
        else if (feedback) helpText = feedback
        else helpText = ''
    }
    $: name = nameProp ? nameProp : slugify(label)
</script>

<Label value="{label}" optional="{optional}" hideOptionalLabel="{hideOptionalLabel}">
    <div
        class="input-wrapper cursor-pointer text-gray-700 overflow-hidden"
        class:input-wrapper-readonly="{readonly}"
        class:input-wrapper-disabled="{disabled}"
        class:input-wrapper-active="{!disabled && !readonly && !isInvalidState}"
        class:input-wrapper-error="{isInvalidState}"
    >
        <div class="flex flex-col sm:flex-row">
            {#if variant !== 'nopreview'}
                <div class="{VARIANT_MAP[variant].preview}">
                    {#if typeof previewBlob === 'string'}
                        <img
                            src="{previewBlob}"
                            alt=""
                            class="w-full h-full object-cover absolute"
                            class:grayscale="{disabled}"
                        />
                    {:else}
                        <div
                            class="flex items-center justify-center w-full h-full text-gray"
                            class:bg-gray-200="{!disabled}"
                            class:bg-gray-100="{disabled}"
                            class:border-r="{disabled}"
                        >
                            <Image />
                        </div>
                    {/if}
                </div>
            {/if}
            <div class="{VARIANT_MAP[variant].dropzone}">
                <Upload size="{6}" />
                <p class="font-semibold">Choose an image…</p>
            </div>
        </div>
        <div class="border-t px-2 py-1 text-sm" class:border-gray-300="{!disabled}">
            {#if typeof files === 'undefined' || files.length === 0}
                <p>No file selected</p>
            {:else}
                {#each files as file}
                    <p>{file.name}</p>
                {/each}
            {/if}
        </div>
        <input
            type="file"
            name="{name}"
            class="sr-only"
            accept="image/png, image/jpeg"
            required="{!optional}"
            readonly="{readonly}"
            disabled="{disabled || readonly}"
            aria-invalid="{isInvalidState}"
            bind:files
        />
    </div>

    <InputFeedbackSection
        helpText="{helpText}"
        feedback=""
        isInvalidState="{isInvalidState}"
        errorMessage="{errorMessage}"
    />
</Label>
