<script lang="ts">
    import { onMount, onDestroy, getContext } from 'svelte'
    import type { Content } from '@tiptap/core'
    import { Editor } from '@tiptap/core'

    import { formatNumber } from '@nick-mazuk/lib/esm/number-styling'
    import { slugify } from '@nick-mazuk/lib/esm/text-styling'

    import BoldIcon from '../../../elements/icon/bold.svelte'
    import CodeIcon from '../../../elements/icon/code.svelte'
    import Heading1Icon from '../../../elements/icon/heading-1.svelte'
    import Heading2Icon from '../../../elements/icon/heading-2.svelte'
    import ImageIcon from '../../../elements/icon/image.svelte'
    import ItalicIcon from '../../../elements/icon/italic.svelte'
    import LinkIcon from '../../../elements/icon/link.svelte'
    import ListIcon from '../../../elements/icon/list.svelte'
    import ListNumberedIcon from '../../../elements/icon/list-numbered.svelte'
    import QuoteIcon from '../../../elements/icon/quote.svelte'

    import Button from '../../../elements/button/button.svelte'
    import Tooltip from '../../../components/tooltip/tooltip.svelte'
    import UrlInput from '../url-input/url-input.svelte'
    import type { TextInputChangeEvent } from '../text-input'
    import { buildExtensions } from './_build-extensions'
    import type { FormItemSize } from '../../form-sizes'
    import { FORM_SIZE_MAP } from '../../form-sizes'
    import Label from '../../label/label.svelte'
    import type { FormSync } from '../..'
    import InputFeedbackSection from '../text-input/_input-feedback-section.svelte'
    import ModalForm from '../../../components/modal/modal-form/modal-form.svelte'

    type Heading = 1 | 2 | 3 | 4 | boolean
    export let h1: Heading = false
    export let h2: Heading = false
    export let b = false

    // eslint-disable-next-line unicorn/prevent-abbreviations -- false positive
    export let i = false
    export let ol = false
    export let ul = false
    export let a = false
    export let blockquote = false
    export let code = false
    export let img = false

    export let label = 'Rich text'
    let nameProp = ''
    export { nameProp as name }
    export let defaultValue: Content = ''
    export let size: FormItemSize = 'default'
    export let maxCharacters = 0
    export let helpText = ''
    export let requiredMessage = 'This field is required'
    export let optional = false
    export let hideOptionalLabel = false
    export let readonly = false
    export let disabled = false

    let containerElement: HTMLDivElement | undefined = undefined

    let editor: Editor
    let isFocused = false
    let showLinkModal = false
    let modalLinkValue = ''
    let modalLinkDefaultValue = ''
    let showAddImageSlot = false
    const formSync = getContext<FormSync>('formSync')

    const openLinkModal = () => {
        const existingHref = editor.getAttributes('link')?.href
        modalLinkDefaultValue = existingHref ? existingHref : ''
        showLinkModal = true
        return true
    }
    const handleUrlInputChange = (event: TextInputChangeEvent) =>
        (modalLinkValue = event.detail.value)
    const closeLinkModal = (action?: 'unset' | 'close') => {
        if (action !== 'close') {
            if (action === 'unset' || modalLinkValue === '')
                editor.chain().focus().unsetLink().run()
            else editor.chain().focus().setLink({ href: modalLinkValue }).run()
        }
        showLinkModal = false
        editor.chain().focus().run()
    }
    const openImageModal = () => (showAddImageSlot = true)
    const addImageToText = ({
        url,
        width,
        height,
    }: {
        url: string
        width?: number
        height?: number
    }) => {
        if (url) editor.chain().focus().setImage({ src: url, width, height }).run()
        else editor.chain().focus().run()
        showAddImageSlot = false
    }

    onMount(() => {
        editor = new Editor({
            element: containerElement,
            extensions: buildExtensions({
                h1,
                h2,
                b,
                i,
                ol,
                ul,
                a,
                blockquote,
                code,
                img,
                openImageModal,
                openLinkModal,
                maxCharacters,
            }),
            onTransaction: () => {
                editor = editor
            },
            content: defaultValue,
            injectCSS: false,
            editorProps: {
                attributes: {
                    class: `focus:outline-none outline-none ${FORM_SIZE_MAP[size].content.paddingLeft} ${FORM_SIZE_MAP[size].content.paddingRight} py-4 prose max-w-none whitespace-pre-wrap`,
                },
            },
            editable: !disabled && !readonly,
            onFocus: () => (isFocused = true),
            onBlur: () => (isFocused = false),
        })
    })

    onDestroy(() => {
        if (editor) editor.destroy()
    })

    const getIsButtonActive = (
        property: string,
        currentEditor: Editor | undefined,
        focused: boolean,
        propretyOptions?: Record<string, any>
    ) => {
        if (!currentEditor) return false
        return currentEditor.isActive(property, propretyOptions) && focused
    }

    let menuButtons: {
        icon: unknown
        onClick: () => any
        canRun?: () => boolean
        property: string
        propertyOptions?: Record<string, any>
        tooltip?: string
        buttonName: string
    }[]
    $: isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().includes('MAC')
    $: isMobile =
        typeof navigator !== 'undefined' &&
        Boolean(
            navigator.userAgent.match(
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/iu
            )
        )
    $: shiftKey = isMac ? '⇧' : 'Shift+'
    $: metaKey = isMac ? '⌘' : 'Ctrl+'

    $: {
        const tempButtons: typeof menuButtons = []
        if (h1) {
            const level = typeof h1 === 'number' ? h1 : 1
            tempButtons.push({
                icon: Heading1Icon,
                onClick: () => editor.chain().focus().toggleHeading({ level }).run(),
                canRun: () => editor?.can().toggleHeading({ level }),
                property: 'heading',
                propertyOptions: { level },
                tooltip: `${metaKey}${shiftKey}1`,
                buttonName: 'large heading',
            })
        }
        if (h2) {
            const level = typeof h2 === 'number' ? h2 : 2
            tempButtons.push({
                icon: Heading2Icon,
                onClick: () => editor.chain().focus().toggleHeading({ level }).run(),
                canRun: () => editor?.can().toggleHeading({ level }),
                property: 'heading',
                propertyOptions: { level },
                tooltip: `${metaKey}${shiftKey}2`,
                buttonName: 'small heading',
            })
        }
        if (b) {
            tempButtons.push({
                icon: BoldIcon,
                onClick: () => editor.chain().focus().toggleBold().run(),
                canRun: () => editor?.can().toggleBold(),
                property: 'bold',
                tooltip: `${metaKey}B`,
                buttonName: 'bold',
            })
        }
        if (i) {
            tempButtons.push({
                icon: ItalicIcon,
                onClick: () => editor.chain().focus().toggleItalic().run(),
                canRun: () => editor?.can().toggleItalic(),
                property: 'italic',
                tooltip: `${metaKey}I`,
                buttonName: 'italics',
            })
        }
        if (a) {
            tempButtons.push({
                icon: LinkIcon,
                onClick: openLinkModal,
                property: 'link',
                tooltip: `${metaKey}K`,
                buttonName: 'link',
            })
        }
        if (ul) {
            tempButtons.push({
                icon: ListIcon,
                onClick: () => editor.chain().focus().toggleBulletList().run(),
                canRun: () => editor?.can().toggleBulletList(),
                property: 'bulletList',
                tooltip: `${metaKey}${shiftKey}8`,
                buttonName: 'bulleted list',
            })
        }
        if (ol) {
            tempButtons.push({
                icon: ListNumberedIcon,
                onClick: () => editor.chain().focus().toggleOrderedList().run(),
                canRun: () => editor?.can().toggleOrderedList(),
                property: 'orderedList',
                tooltip: `${metaKey}${shiftKey}7`,
                buttonName: 'numbered list',
            })
        }

        if (blockquote) {
            tempButtons.push({
                icon: QuoteIcon,
                onClick: () => editor.chain().focus().toggleBlockquote().run(),
                canRun: () => editor?.can().toggleBlockquote(),
                property: 'blockquote',
                tooltip: `${metaKey}${shiftKey}B`,
                buttonName: 'block quote',
            })
        }
        if (code) {
            tempButtons.push({
                icon: CodeIcon,
                onClick: () => editor.chain().focus().toggleCodeBlock().run(),
                canRun: () => editor?.can().toggleCodeBlock(),
                property: 'codeBlock',
                tooltip: `${metaKey}${shiftKey}E`,
                buttonName: 'code block',
            })
        }
        if (img) {
            tempButtons.push({
                icon: ImageIcon,
                onClick: () => (showAddImageSlot = true),
                canRun: () => editor?.can().toggleHeading({ level: 1 }),
                property: 'image',
                tooltip: `${metaKey}${shiftKey}I`,
                buttonName: 'image',
            })
        }
        menuButtons = tempButtons
    }
    $: isEditable = !readonly && !disabled
    $: characterCount = editor?.getCharacterCount() || 0
    $: feedback = maxCharacters ? `${characterCount} / ${formatNumber(maxCharacters)}` : ''
    let showError = false
    const reset = () => {
        editor.commands.setContent(defaultValue, true)
    }
    $: name = nameProp ? nameProp : slugify(label)
    $: if (formSync) {
        formSync.updateForm(
            name,
            {
                json: JSON.stringify(editor?.getJSON() || ''),
                html: editor?.getHTML() || '',
            },
            () => {
                showError = true
                return isValid
            },
            reset
        )
    }
    $: isValid = optional || characterCount > 0
    $: isInvalidState = !isValid && showError
</script>

<div class="flex flex-col space-y-1">
    <Label
        value="{label}"
        optional="{optional}"
        hideOptionalLabel="{hideOptionalLabel}"
        readonly="{readonly}"
    />
    <div
        class="input-wrapper"
        class:input-wrapper-readonly="{readonly}"
        class:input-wrapper-disabled="{disabled}"
        class:input-wrapper-active="{!disabled && !readonly && !isInvalidState}"
        class:input-wrapper-error="{isInvalidState}"
    >
        <div class="border-b px-1 flex overflow-x-scroll hide-scrollbar">
            {#each menuButtons as button}
                <div
                    class="hover:text-primary flex-none"
                    class:text-primary="{getIsButtonActive(
                        button.property,
                        editor,
                        isFocused,
                        button.propertyOptions
                    )}"
                    class:text-gray="{!getIsButtonActive(
                        button.property,
                        editor,
                        isFocused,
                        button.propertyOptions
                    )}"
                >
                    <Tooltip
                        value="{isMobile || !isEditable || (button.canRun && !button.canRun())
                            ? ''
                            : button.tooltip}"
                    >
                        <Button
                            on:click="{button.onClick}"
                            variant="static"
                            shape="square"
                            slot="trigger"
                            disabled="{!isEditable || (button.canRun && !button.canRun())}"
                            size="{size === 'small' ? 'small' : 'default'}"
                            ariaLabel="{getIsButtonActive(
                                button.property,
                                editor,
                                isFocused,
                                button.propertyOptions
                            ) && button.buttonName !== 'image'
                                ? `Remove ${button.buttonName}`
                                : `Add ${button.buttonName}`}"
                        >
                            <div class:text-gray-200="{button.canRun && !button.canRun()}">
                                <svelte:component
                                    this="{button.icon}"
                                    size="{size === 'small' ? 4 : 5}"
                                    strokeWidth="{getIsButtonActive(
                                        button.property,
                                        editor,
                                        isFocused,
                                        button.propertyOptions
                                    )
                                        ? 3
                                        : 2}"
                                />
                            </div>
                        </Button>
                    </Tooltip>
                </div>
            {/each}
        </div>
        <div bind:this="{containerElement}"></div>
    </div>
    <InputFeedbackSection
        helpText="{helpText}"
        feedback="{feedback}"
        isInvalidState="{isInvalidState}"
        errorMessage="{requiredMessage}"
    />
</div>
<ModalForm
    title="Add link"
    bind:isOpen="{showLinkModal}"
    refocusOnClose="{false}"
    on:close="{() => closeLinkModal('close')}"
    resetOnSubmit
    handleSubmit="{() => {
        closeLinkModal()
        return Promise.resolve(true)
    }}"
    primaryAction="Add link"
    secondaryAction="Remove link"
    secondaryActionSubmit="{false}"
    on:secondaryClick="{() => closeLinkModal('unset')}"
    success=""
    size="small"
>
    <UrlInput
        on:change="{handleUrlInputChange}"
        defaultValue="{modalLinkDefaultValue}"
        autofocus
        optional
        hideOptionalLabel
    />
</ModalForm>

{#if showAddImageSlot}
    <slot
        name="add-image-modal"
        addImageToText="{addImageToText}"
        onModalClose="{() => {
            showAddImageSlot = false
            editor.chain().focus().run()
        }}"
    />
{/if}
