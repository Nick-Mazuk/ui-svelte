export type TocItem = { href: string; text: string }
export type SectionItem = TocItem & { children: TocItem[] }
export type TocItems = (TocItem | SectionItem)[]
