type SizeDetail = {
    height: string
    textSize: string
    affix: {
        icon: number
        paddingPrefix: string
        paddingSuffix: string
    }
    content: {
        paddingLeft: string
        paddingRight: string
    }
}

export type FormItemSize = 'small' | 'default' | 'large'
export const FORM_SIZE_MAP: Record<FormItemSize, SizeDetail> = {
    small: {
        height: 'h-8',
        textSize: 'text-base',
        affix: {
            icon: 4,
            paddingPrefix: 'pl-2 pr-2',
            paddingSuffix: 'pl-2 pr-2',
        },
        content: {
            paddingLeft: 'pl-3',
            paddingRight: 'pr-3',
        },
    },
    default: {
        height: 'h-10',
        textSize: 'text-base',
        affix: {
            icon: 5,
            paddingPrefix: 'pl-3 pr-2',
            paddingSuffix: 'pl-2 pr-3',
        },
        content: {
            paddingLeft: 'pl-4',
            paddingRight: 'pr-4',
        },
    },
    large: {
        height: 'h-12',
        textSize: 'text-lg',
        affix: {
            icon: 6,
            paddingPrefix: 'pl-3 pr-3',
            paddingSuffix: 'pl-3 pr-3',
        },
        content: {
            paddingLeft: 'pl-4',
            paddingRight: 'pr-4',
        },
    },
}
