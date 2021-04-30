import type { Color } from '@nick-mazuk/ui-config/lib/colors'
import { colorsHexMap } from '@nick-mazuk/ui-config/lib/colors'
import AcColor from 'ac-colors'
import fs from 'fs-extra'

type ColorGroups = {
    [groupName: string]: Partial<Record<Color, string>>
}

const TEMPLATE_LOCATION = 'cli/generate-docs/templates'

const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const createColorSectionStart = (baseName: string) => {
    const capitalizedName = capitalizeFirstLetter(baseName)
    return `<section class='my-8'>
    <div class='prose'>
        <h3>${capitalizedName}</h3>
    </div>
    <div class='border !my-8 rounded-lg overflow-hidden !-mx-3 md:!-mx-6'>`
}

const createColorItemHtml = (colorName: string, hex: string, accent: boolean) => {
    const capitalizedName = colorName
        .split('-')
        .map((part) => capitalizeFirstLetter(part))
        .join(' ')
    const whiteColor = new AcColor({ color: '#FFFFFF', type: 'hex' })
    const currentColor = new AcColor({ color: hex, type: 'hex' })
    const contrastOnWhite = AcColor.contrastRatio(whiteColor, currentColor)
    const textColor = contrastOnWhite < 4.5 ? 'foreground' : 'background'
    let darkTextColor = ''
    if (accent)
        darkTextColor = contrastOnWhite < 4.5 ? 'dark:text-background' : 'dark:text-foreground'
    return `
        <div class='px-3 md:px-6 py-8 grid grid-cols-1 md:grid-cols-5 text-${textColor} ${darkTextColor} bg-${colorName}'>
            <div class='!text-2xl font-bold col-span-2'>${capitalizedName}</div>
            <div class='!text-base md:!text-lg opacity-60 md:opacity-100 font-semibold col-span-2'>var(--c-${colorName})</div>
            <div class='!text-base md:!text-lg opacity-60 md:opacity-100 font-semibold md:text-right'>${hex}</div>
        </div>`
}

const createColorSectionEnd = () => {
    return `
    </div>
</section>
`
}

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

const generateHtml = (colors: ColorGroups) => {
    let html = ''
    const idealOrder = ['gray', 'primary', 'highlight', 'success', 'warning', 'error', 'accent']
    const groups = Object.keys(colors).sort((a, b) => {
        const aIndex = idealOrder.indexOf(a)
        const bIndex = idealOrder.indexOf(b)
        if (aIndex < 0 || bIndex < 0) return 0
        if (aIndex < 0) return 1
        if (bIndex < 0) return -1
        return aIndex < bIndex ? -1 : 1
    })
    groups.forEach((group) => {
        html += createColorSectionStart(group)
        if (group === 'gray')
            html += createColorItemHtml('background', colorsHexMap.background, false)
        const shades = Object.keys(colors[group]).sort() as Color[]
        shades.forEach((shade) => {
            if (!shade.includes('-')) return
            html += createColorItemHtml(shade, colorsHexMap[shade], group === 'accent')
        })
        if (group === 'gray')
            html += createColorItemHtml('foreground', colorsHexMap.foreground, false)
        html += createColorSectionEnd()
    })
    return html
}

export const generateColorDocs = (): void => {
    let contents = fs.readFileSync(`${TEMPLATE_LOCATION}/colors.stories.mdx`).toString()
    const colors = getColorCategories()
    contents += generateHtml(colors)
    fs.writeFileSync('src/style-guide/colors.stories.mdx', contents)
}
