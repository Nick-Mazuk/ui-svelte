export type ChangelogItemVariant = 'feature' | 'bug' | 'announcement' | 'improvement'
export type ChangelogImage = {
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
export type ChangelogItem = {
    title: string
    slug: string
    publishedAt: Date
    image: ChangelogImage

    contents: string
    variant: ChangelogItemVariant
}
export type ChangelogItems = ChangelogItem[]
