<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import { Editor } from '@tiptap/core'

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
    import Modal from '../../../components/modal/modal.svelte'
    import UrlInput from '../url-input/url-input.svelte'
    import Form from '../../form/form.svelte'
    import type { TextInputChangeEvent } from '../text-input'
    import { buildExtensions } from './_build-extensions'
    import { FormItemSize, FORM_SIZE_MAP } from '../../form-sizes'

    type Heading = 1 | 2 | 3 | 4 | boolean
    export let h1: Heading = false
    export let h2: Heading = false
    export let b = false
    export let i = false
    export let ol = false
    export let ul = false
    export let a = false
    export let blockquote = false
    export let code = false
    export let img = false

    export let size: FormItemSize = 'default'

    let containerElement: HTMLDivElement | undefined = undefined

    let editor: Editor
    let isFocused = false
    let showLinkModal = false
    let modalLinkValue = ''
    let modalLinkDefaultValue = ''
    let showAddImageSlot = false

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
    const addImageToText = (url: string) => {
        if (url) editor.chain().focus().setImage({ src: url }).run()
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
            }),
            content: `<p>Hello world</p>`,
            onTransaction: () => {
                // force re-render so `editor.isActive` works as expected
                editor = editor
            },
            injectCSS: false,
            editorProps: {
                attributes: {
                    class: `focus:outline-none outline-none ${FORM_SIZE_MAP[size].content.paddingLeft} ${FORM_SIZE_MAP[size].content.paddingRight} py-4 prose max-w-none bg-background whitespace-pre-wrap`,
                },
            },
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
    }[]
    $: isMac = navigator?.platform.toUpperCase().indexOf('MAC') >= 0
    $: isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/iu.test(
        navigator?.userAgent
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
            })
        }
        if (b) {
            tempButtons.push({
                icon: BoldIcon,
                onClick: () => editor.chain().focus().toggleBold().run(),
                canRun: () => editor?.can().toggleBold(),
                property: 'bold',
                tooltip: `${metaKey}B`,
            })
        }
        if (i) {
            tempButtons.push({
                icon: ItalicIcon,
                onClick: () => editor.chain().focus().toggleItalic().run(),
                canRun: () => editor?.can().toggleItalic(),
                property: 'italic',
                tooltip: `${metaKey}I`,
            })
        }
        if (a) {
            tempButtons.push({
                icon: LinkIcon,
                onClick: openLinkModal,
                property: 'link',
                tooltip: `${metaKey}K`,
            })
        }
        if (ul) {
            tempButtons.push({
                icon: ListIcon,
                onClick: () => editor.chain().focus().toggleBulletList().run(),
                canRun: () => editor?.can().toggleBulletList(),
                property: 'bulletList',
                tooltip: `${metaKey}${shiftKey}8`,
            })
        }
        if (ol) {
            tempButtons.push({
                icon: ListNumberedIcon,
                onClick: () => editor.chain().focus().toggleOrderedList().run(),
                canRun: () => editor?.can().toggleOrderedList(),
                property: 'orderedList',
                tooltip: `${metaKey}${shiftKey}7`,
            })
        }

        if (blockquote) {
            tempButtons.push({
                icon: QuoteIcon,
                onClick: () => editor.chain().focus().toggleBlockquote().run(),
                canRun: () => editor?.can().toggleBlockquote(),
                property: 'blockquote',
                tooltip: `${metaKey}${shiftKey}B`,
            })
        }
        if (code) {
            tempButtons.push({
                icon: CodeIcon,
                onClick: () => editor.chain().focus().toggleCodeBlock().run(),
                canRun: () => editor?.can().toggleCodeBlock(),
                property: 'codeBlock',
                tooltip: `${metaKey}${shiftKey}E`,
            })
        }
        if (img) {
            tempButtons.push({
                icon: ImageIcon,
                onClick: () => (showAddImageSlot = true),
                canRun: () => editor?.can().toggleHeading({ level: 1 }),
                property: 'image',
                tooltip: `${metaKey}${shiftKey}I`,
            })
        }
        menuButtons = tempButtons
    }

</script>

<div class="input-wrapper input-wrapper-active">
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
                    value="{isMobile || (button.canRun && !button.canRun()) ? '' : button.tooltip}"
                >
                    <Button
                        on:click="{button.onClick}"
                        variant="static"
                        shape="square"
                        slot="trigger"
                        disabled="{button.canRun && !button.canRun()}"
                        size="{size === 'small' ? 'small' : 'default'}"
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

<Modal
    title="Add link"
    bind:isOpen="{showLinkModal}"
    refocusOnClose="{false}"
    on:close="{() => closeLinkModal('close')}"
>
    <Form
        resetOnSubmit
        handleSubmit="{() => {
            closeLinkModal()
            return Promise.resolve(true)
        }}"
    >
        <UrlInput
            on:change="{handleUrlInputChange}"
            defaultValue="{modalLinkDefaultValue}"
            autofocus
            optional
            hideOptionalLabel
        />
        <div class="mt-4 flex justify-end space-x-4">
            <Button variant="secondary" on:click="{() => closeLinkModal('unset')}">
                Remove link
            </Button>
            <Button submit>Add link</Button>
        </div>
    </Form>
</Modal>

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
