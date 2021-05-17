<script lang="ts">
    import { getContext } from 'svelte'

    import Label from '../../label/label.svelte'
    import Upload from '../../../elements/icon/upload.svelte'
    import Error from '../../../elements/error/error.svelte'
    import { formatNumber } from '@nick-mazuk/lib/esm/number-styling'
    import { endWithPunctuation, slugify } from '@nick-mazuk/lib/esm/text-styling'
    import type { FormSync } from '../..'

    type FileType = 'image' | 'audio' | 'pdf' | 'any'

    export let label = 'File'
    let nameProp = ''
    export { nameProp as name }
    let helpTextProp = ''
    export { helpTextProp as helpText }
    export let fileType: FileType = 'any'
    export let maxFileSize: number | undefined = undefined
    export let maxUploadSize: number | undefined = undefined
    export let multiple = false
    export let readonly = false
    export let disabled = false
    export let optional = false
    export let hideOptionalLabel = false
    export let requiredMessage = 'Select an image to upload'

    const FILE_TYPE_MAP: Record<FileType, string> = {
        image: 'image/png, image/jpeg',
        audio: 'audio/mpeg',
        pdf: 'application/pdf',
        any: '',
    }

    let files: FileList | undefined
    let errorMessage = ''
    let showError = false
    const formSync = getContext<FormSync>('formSync')

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
    $: if (files && files[0]) showError = true
    $: {
        let tempErrorMessage = ''
        if ((!files || files.length < 1) && !optional) {
            tempErrorMessage = requiredMessage
        } else if (files && (maxUploadSize || maxFileSize)) {
            let totalUpload = 0
            let maxFile = 0

            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                totalUpload += file.size / (1024 * 1024)
                maxFile = Math.max(maxFile, file.size / (1024 * 1024))
            }
            if (maxUploadSize && totalUpload > maxUploadSize)
                tempErrorMessage = `Files must be under ${formatNumber(maxUploadSize)} MB total`
            else if (maxFileSize && maxFile > maxFileSize)
                tempErrorMessage = `Each file must be under ${formatNumber(maxFileSize)} MB `
        }

        errorMessage = tempErrorMessage
    }
    $: isInvalidState = errorMessage !== '' && showError && !readonly
    let helpText = ''
    $: {
        let feedback = ''
        if (maxUploadSize)
            feedback = `Maximum upload size is ${formatNumber(maxUploadSize)} MB (total)`
        else if (maxFileSize) feedback = `Maximum file size is ${formatNumber(maxFileSize)} MB`
        if (helpTextProp && feedback) {
            helpText = `${endWithPunctuation(helpTextProp, '.')} ${feedback}.`
        } else if (helpTextProp) {
            helpText = helpTextProp
        } else if (feedback) {
            helpText = feedback
        } else {
            helpText = ''
        }
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
        <div class="flex flex-col w-full justify-center items-center py-4 px-2 h-24">
            <Upload size="{6}" />
            <p class="font-semibold">{multiple ? 'Choose files…' : 'Choose a file…'}</p>
        </div>

        <div class="border-t px-2 py-1 text-sm" class:border-gray-300="{!disabled}">
            {#if typeof files === 'undefined' || files.length === 0}
                <p>{multiple ? 'No files selected' : 'No file selected'}</p>
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
            accept="{FILE_TYPE_MAP[fileType]}"
            required="{!optional}"
            readonly="{readonly}"
            disabled="{disabled || readonly}"
            aria-invalid="{isInvalidState}"
            multiple="{multiple}"
            bind:files
        />
    </div>

    {#if helpText}
        <p class="text-sm text-gray-700">{helpText}</p>
    {/if}

    {#if isInvalidState}
        <Error label="">{errorMessage}</Error>
    {/if}
</Label>
