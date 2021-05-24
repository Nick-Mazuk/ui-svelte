export type ChangelogItemVariant = 'feature' | 'bug' | 'announcement' | 'improvement'
export type ChangelogItem = {
    title: string
    slug: string
    publishedAt: Date
    image: {
        src?: string
        srcSet?: {
            src?: string
            media?: string
            type?: string
            sizes?: string
        }[]
        width?: number
        height?: number
    }

    contents: string
    variant: ChangelogItemVariant
}
export type ChangelogItems = ChangelogItem[]
