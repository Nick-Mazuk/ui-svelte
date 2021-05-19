/* eslint-disable max-lines-per-function, sonarjs/cognitive-complexity -- it's just going to be long */

import type { Extensions } from '@tiptap/core'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import History from '@tiptap/extension-history'
import Image from '@tiptap/extension-image'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Typography from '@tiptap/extension-typography'

type Heading = 1 | 2 | 3 | 4 | boolean
type Props = {
    h1: Heading
    h2: Heading
    b: boolean
    i: boolean
    ol: boolean
    ul: boolean
    a: boolean
    blockquote: boolean
    code: boolean
    img: boolean
    openLinkModal: () => boolean
    openImageModal: () => boolean
}

export const buildExtensions = ({
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
    openLinkModal,
    openImageModal,
}: Props): Extensions => {
    const extensions: Extensions = [Paragraph, Text, Typography, Document, History]
    if (blockquote) {
        extensions.push(
            Blockquote.extend({
                content: 'paragraph*',
            })
        )
    }
    if (b) extensions.push(Bold)
    if (ol || ul) extensions.push(ListItem)
    if (ul) extensions.push(BulletList)

    if (ol) extensions.push(OrderedList)
    if (code) {
        extensions.push(Code)
        extensions.push(
            CodeBlock.extend({
                addKeyboardShortcuts() {
                    return {
                        'Mod-Shift-e': () => this.editor.commands.toggleCodeBlock(),

                        // remove code block when at start of document or code block is empty
                        Backspace: () => {
                            const { empty, $anchor } = this.editor.state.selection
                            const isAtStart = $anchor.pos === 1

                            if (!empty || $anchor.parent.type.name !== this.name) return false

                            if (isAtStart || $anchor.parent.textContent.length === 0)
                                return this.editor.commands.clearNodes()

                            return false
                        },
                    }
                },
            })
        )
    }
    if (a) {
        extensions.push(
            Link.configure({
                HTMLAttributes: {
                    // eslint-disable-next-line no-undefined -- needed for API
                    target: undefined,
                    // eslint-disable-next-line no-undefined -- needed for API
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
            })
        )
    }
    if (i) extensions.push(Italic)
    if (img) {
        extensions.push(
            Image.extend({
                addKeyboardShortcuts() {
                    return {
                        'Mod-Shift-i': openImageModal,
                    }
                },
            })
        )
    }
    if (h1 || h2) {
        const levels: number[] = []
        const heading1 = typeof h1 === 'number' ? h1 : 1
        const heading2 = typeof h2 === 'number' ? h2 : 2
        if (h1) levels.push(heading1)
        if (h2) levels.push(heading2)
        extensions.push(
            Heading.extend({
                levels,
                addKeyboardShortcuts() {
                    const shortcuts: { [shortcut: string]: () => boolean } = {}
                    if (h1) {
                        shortcuts['Mod-Shift-1'] = () =>
                            this.editor.commands.toggleHeading({ level: heading1 })
                    }
                    if (h2) {
                        shortcuts['Mod-Shift-2'] = () =>
                            this.editor.commands.toggleHeading({ level: heading2 })
                    }
                    return shortcuts
                },
                marks: '',
            })
        )
    }

    return extensions
}
