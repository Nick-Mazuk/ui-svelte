<svelte:options immutable />

<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import { Editor } from '@tiptap/core'

    import Blockquote from '@tiptap/extension-blockquote'
    import Bold from '@tiptap/extension-bold'
    import BulletList from '@tiptap/extension-bullet-list'
    import Code from '@tiptap/extension-code'
    import CodeBlock from '@tiptap/extension-code-block'
    import Document from '@tiptap/extension-document'
    import HardBreak from '@tiptap/extension-hard-break'
    import Heading from '@tiptap/extension-heading'
    import History from '@tiptap/extension-history'
    import Italic from '@tiptap/extension-italic'
    import Image from '@tiptap/extension-image'
    import Link from '@tiptap/extension-link'
    import ListItem from '@tiptap/extension-list-item'
    import OrderedList from '@tiptap/extension-ordered-list'
    import Paragraph from '@tiptap/extension-paragraph'
    import Text from '@tiptap/extension-text'
    import Typography from '@tiptap/extension-typography'

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

    let containerElement: HTMLDivElement | undefined = undefined

    let editor: Editor
    let isFocused = false

    const openLinkModal = () => {
        showLinkModal = true
        return true
    }
    onMount(() => {
        editor = new Editor({
            element: containerElement,
            extensions: [
                Blockquote.extend({
                    content: 'paragraph*',
                }),
                Bold,
                BulletList.extend({
                    addCommands() {
                        return {
                            toggleBulletList: () => ({ commands }) => {
                                return commands.toggleList('bulletList', 'listItem')
                            },
                        }
                    },
                }),
                Code,
                CodeBlock.extend({
                    addKeyboardShortcuts() {
                        return {
                            'Mod-Shift-e': () => this.editor.commands.toggleCodeBlock(),

                            // remove code block when at start of document or code block is empty
                            Backspace: () => {
                                const { empty, $anchor } = this.editor.state.selection
                                const isAtStart = $anchor.pos === 1

                                if (!empty || $anchor.parent.type.name !== this.name) {
                                    return false
                                }

                                if (isAtStart || !$anchor.parent.textContent.length) {
                                    return this.editor.commands.clearNodes()
                                }

                                return false
                            },
                        }
                    },
                }),
                Document,
                HardBreak,
                Heading.extend({
                    levels: [1, 2],
                    addKeyboardShortcuts() {
                        return {
                            'Mod-Shift-1': () => this.editor.commands.toggleHeading({ level: 1 }),
                            'Mod-Shift-2': () => this.editor.commands.toggleHeading({ level: 2 }),
                        }
                    },
                    marks: '',
                }),
                History,
                Image.extend({
                    addKeyboardShortcuts() {
                        return {
                            'Mod-Shift-i': () => (showAddImageSlot = true),
                        }
                    },
                }),
                Italic,
                Link.configure({
                    HTMLAttributes: {
                        target: undefined,
                        rel: undefined,
                        'sveltekit:prefetch': '',
                    },
                    openOnClick: false,
                }).extend({
                    addKeyboardShortcuts() {
                        return {
                            'Mod-k': openLinkModal,
                        }
                    },
                }),
                ListItem.extend({
                    content: '(paragraph)*',
                }),
                OrderedList,
                Paragraph,
                Text,
                Typography,
            ],
            content: `<p>Hello world</p>`,
            onTransaction: () => {
                // force re-render so `editor.isActive` works as expected
                editor = editor
            },
            injectCSS: false,
            editorProps: {
                attributes: {
                    class:
                        'focus:outline-none outline-none p-6 prose max-w-none whitespace-pre-wrap',
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

    let showLinkModal = false
    let modalLinkValue = ''
    let showAddImageSlot = false
    let menuButtons: {
        icon: unknown
        onClick: () => any
        canRun?: () => boolean
        property: string
        propertyOptions?: Record<string, any>
        tooltip?: string
    }[]
    const handleUrlInputChange = (event: TextInputChangeEvent) =>
        (modalLinkValue = event.detail.value)
    const closeLinkModal = (action?: 'unset') => {
        if (action === 'unset' || modalLinkValue === '') editor.chain().focus().unsetLink().run()
        else editor.chain().focus().setLink({ href: modalLinkValue }).run()
        showLinkModal = false
    }
    const addImageToText = (url: string) => {
        if (url) editor.chain().focus().setImage({ src: url }).run()
        else editor.chain().focus().run()
        showAddImageSlot = false
    }
    $: isMac = navigator?.platform.toUpperCase().indexOf('MAC') >= 0
    $: isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/iu.test(
        navigator?.userAgent
    )
    $: shiftKey = isMac ? '⇧' : 'Shift+'
    $: metaKey = isMac ? '⌘' : 'Ctrl+'

    $: menuButtons = [
        {
            icon: Heading1Icon,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            canRun: () => editor?.can().toggleHeading({ level: 1 }),
            property: 'heading',
            propertyOptions: { level: 1 },
            tooltip: `${metaKey}${shiftKey}1`,
        },
        {
            icon: Heading2Icon,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            canRun: () => editor?.can().toggleHeading({ level: 2 }),
            property: 'heading',
            propertyOptions: { level: 2 },
            tooltip: `${metaKey}${shiftKey}2`,
        },
        {
            icon: BoldIcon,
            onClick: () => editor.chain().focus().toggleBold().run(),
            canRun: () => editor?.can().toggleBold(),
            property: 'bold',
            tooltip: `${metaKey}B`,
        },
        {
            icon: ItalicIcon,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            canRun: () => editor?.can().toggleItalic(),
            property: 'italic',
            tooltip: `${metaKey}I`,
        },
        {
            icon: ListIcon,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            canRun: () => editor?.can().toggleBulletList(),
            property: 'bulletList',
            tooltip: `${metaKey}${shiftKey}8`,
        },
        {
            icon: ListNumberedIcon,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            canRun: () => editor?.can().toggleOrderedList(),
            property: 'orderedList',
            tooltip: `${metaKey}${shiftKey}7`,
        },
        {
            icon: LinkIcon,
            onClick: openLinkModal,
            property: 'link',
            tooltip: `${metaKey}K`,
        },
        {
            icon: QuoteIcon,
            onClick: () => editor.chain().focus().toggleBlockquote().run(),
            canRun: () => editor?.can().toggleBlockquote(),
            property: 'blockquote',
            tooltip: `${metaKey}${shiftKey}B`,
        },
        {
            icon: CodeIcon,
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
            canRun: () => editor?.can().toggleCodeBlock(),
            property: 'codeBlock',
            tooltip: `${metaKey}${shiftKey}E`,
        },
        {
            icon: ImageIcon,
            onClick: () => (showAddImageSlot = true),
            canRun: () => editor?.can().toggleHeading({ level: 1 }),
            property: 'image',
            tooltip: `${metaKey}${shiftKey}I`,
        },
    ]

</script>

<div class="input-wrapper input-wrapper-active">
    <div class="border-b px-2 flex overflow-x-scroll hide-scrollbar">
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
                    >
                        <div class:text-gray-200="{button.canRun && !button.canRun()}">
                            <svelte:component
                                this="{button.icon}"
                                size="{5}"
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

<Modal title="Add link" bind:isOpen="{showLinkModal}">
    <Form
        resetOnSubmit
        handleSubmit="{() => {
            closeLinkModal()
            return Promise.resolve(true)
        }}"
    >
        <UrlInput on:change="{handleUrlInputChange}" autofocus optional hideOptionalLabel />
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
