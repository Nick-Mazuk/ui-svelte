export type SeoImage =
    | {
          src: string
          width?: number
          height?: number
          type?: 'image/jpeg' | 'image/png' | 'image/svg+xml' | 'image/webp' | 'image/x-mng'
          alt?: string
      }
    | string
export type OpenGraphLocale = 'en_US' | 'en_GB'
export type OpenGraphType =
    | 'music.song'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio'
    | 'video.movie'
    | 'video.episode'
    | 'video.tv_show'
    | 'video.other'
    | 'website'
    | 'article'
    | 'book'
    | 'profile'
export type OpenGraph = {
    title?: string
    description?: string
    image?: SeoImage | SeoImage[]
    video?: string | string[]
    determiner?: string
    url?: string
    type?: OpenGraphType
    locale?: OpenGraphLocale
    article?: {
        publishedTime?: Date
        modifiedTime?: Date
        expirationTime?: Date
        authors?: string[]
        section?: string
        tags?: string[]
    }
    book?: {
        authors?: string[]
        isbn?: string
        releaseDate?: Date
        tags?: string[]
    }
    profile?: {
        firstName?: string
        lastName?: string
        username?: string
        gender?: 'male' | 'female'
    }
}
export type Twitter = {
    site?: string
    title?: string
    description?: string
    image?: string
    imageAlt?: string
}
