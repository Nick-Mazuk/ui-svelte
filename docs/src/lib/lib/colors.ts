import AcColor from 'ac-colors'
import type { Color } from '@nick-mazuk/ui-config/lib/colors'
import { colorsHexMap, colorsCssMap } from '@nick-mazuk/ui-config/lib/colors.ts'

type ColorGroups = {
    [groupName: string]: Partial<Record<Color, string>>
}

type ColorPalette = {
    name: string
    items: {
        name: string
        hexLight: string
        hexDark: string
        cssVariable: string
        isDark: boolean
    }[]
}

export type ColorPalettes = ColorPalette[]

const getColorCategories = () => {
    const allColorNames = Object.keys(colorsHexMap).filter((name) => {
        const splitName = name.split('-')
        const lastPart = splitName[splitName.length - 1]
        if (lastPart.startsWith('i') || lastPart === 'default') return false
        if (['link', 'foreground', 'background'].includes(splitName[0])) return false
        return true
    }) as Color[]
    const colors: ColorGroups = {}
    allColorNames.forEach((name) => {
        const group = name.split('-')[0]
        if (typeof colors[group] === 'undefined') colors[group] = {}
        colors[group][name] = colorsHexMap[name]
    })
    return colors
}

export const generateColorsList = (): ColorPalettes => {
    const colors = getColorCategories()
    const idealOrder = ['gray', 'primary', 'highlight', 'success', 'warning', 'error', 'accent']
    const groups = Object.keys(colors).sort((a, b) => {
        const aIndex = idealOrder.indexOf(a)
        const bIndex = idealOrder.indexOf(b)
        if (aIndex < 0 || bIndex < 0) return 0
        if (aIndex < 0) return 1
        if (bIndex < 0) return -1
        return aIndex < bIndex ? -1 : 1
    })
    const palettes: ColorPalettes = []
    groups.forEach((group) => {
        const palette: ColorPalette = {
            name: group,
            items: [],
        }
        if (group === 'gray') {
            palette.items.push({
                name: 'background',
                hexLight: colorsHexMap.background,
                hexDark: colorsHexMap['background-i'],
                cssVariable: colorsCssMap.background,
                isDark: false,
            })
        }
        const shades = Object.keys(colors[group]).sort() as Color[]
        shades.forEach((shade) => {
            if (!shade.includes('-')) return
            const whiteColor = new AcColor({ color: '#FFFFFF', type: 'hex' })
            const currentColor = new AcColor({ color: colorsHexMap[shade], type: 'hex' })
            const contrastOnWhite = AcColor.contrastRatio(whiteColor, currentColor)
            const darkHexKey = group === 'accent' ? shade : shade.split('-').join('-i')
            palette.items.push({
                name: shade,
                hexLight: colorsHexMap[shade],
                hexDark: colorsHexMap[darkHexKey],
                cssVariable: colorsCssMap[shade],
                isDark: contrastOnWhite > 4.5,
            })
        })
        if (group === 'gray') {
            palette.items.push({
                name: 'foreground',
                hexLight: colorsHexMap.foreground,
                hexDark: colorsHexMap['foreground-i'],
                cssVariable: colorsCssMap.foreground,
                isDark: true,
            })
        }

        palettes.push(palette)
    })
    return palettes
}
