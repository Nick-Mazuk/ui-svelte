import type { Command } from '@tiptap/core'
import { Node, mergeAttributes } from '@tiptap/core'

declare module '@tiptap/core' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- this is how the main library does it
    interface Commands {
        image: {
            setImage: (options: {
                src: string
                alt?: string
                title?: string
                width?: number
                height?: number
            }) => Command
        }
    }
}

export type ImageOptions = {
    inline: boolean
    HTMLAttributes: Record<string, any>
}

export const Image = Node.create<ImageOptions>({
    name: 'image',

    defaultOptions: {
        inline: false,
        HTMLAttributes: {},
    },

    inline() {
        return this.options.inline
    },

    group() {
        return this.options.inline ? 'inline' : 'block'
    },

    draggable: true,

    addAttributes() {
        return {
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
            width: {
                default: null,
            },
            height: {
                default: null,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'img[src]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
    },

    addCommands() {
        return {
            setImage: (options) => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                })
            },
        }
    },
})
