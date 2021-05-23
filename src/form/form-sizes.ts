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
        paddingLeftWithPrefix: string
        paddingRight: string
        paddingRightWithPrefix: string
        paddingY: string
    }
    glue: {
        top: string
        bottom: string
        left: string
        leftPrefix: string
        right: string
        rightPrefix: string
    }
}

export type FormItemSize = 'small' | 'default' | 'large'
export type FormItemGlueSide = 'top' | 'bottom' | 'left' | 'right'
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
            paddingLeftWithPrefix: 'pl-8',
            paddingRight: 'pr-3',
            paddingRightWithPrefix: 'pr-8',
            paddingY: 'py-1',
        },
        glue: {
            top: '-mt-2',
            bottom: '-mb-2',
            left: '-ml-3',
            leftPrefix: '-ml-2',
            right: '-mr-3',
            rightPrefix: '-mr-2',
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
            paddingLeftWithPrefix: 'pl-10',
            paddingRight: 'pr-4',
            paddingRightWithPrefix: 'pr-10',
            paddingY: 'py-2',
        },
        glue: {
            top: '-mt-3',
            bottom: '-mb-3',
            left: '-ml-4',
            leftPrefix: '-ml-3',
            right: '-mr-4',
            rightPrefix: '-mr-3',
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
            paddingLeftWithPrefix: 'pl-12',
            paddingRight: 'pr-4',
            paddingRightWithPrefix: 'pr-12',
            paddingY: 'py-3',
        },
        glue: {
            top: '-mt-4',
            bottom: '-mb-4',
            left: '-ml-4',
            leftPrefix: '-ml-3',
            right: '-mr-4',
            rightPrefix: '-mr-3',
        },
    },
}
