import feather from 'feather-icons'
import fs from 'fs-extra'
import { toHtml } from 'hast-util-to-html'
import parseSvg from 'svg-parser'

const SVG_PATH = 'src/svg'
const TEMPLATE_LOCATION = 'cli/generate-docs/templates'

type IconName = {
    name: string
    feather: boolean
}

const getFeatherIconNames = (customIconNames: string[]): string[] => {
    const names = new Set(Object.keys(feather.icons))
    customIconNames.forEach((name) => names.delete(name))
    return [...names]
}

const getCustomIconNames = () => {
    return fs
        .readdirSync(SVG_PATH)
        .filter((name) => name.endsWith('.svg'))
        .map((name) => name.replace('.svg', ''))
}

const getIconNames = () => {
    const customIconNames = getCustomIconNames()
    const featherIconNames = getFeatherIconNames(customIconNames)
    const iconNames: IconName[] = []
    featherIconNames.forEach((name) => iconNames.push({ name, feather: true }))
    customIconNames.forEach((name) => iconNames.push({ name, feather: false }))
    return iconNames.sort((a, b) => {
        return a.name < b.name ? -1 : 1
    })
}

const getCustomIconData = (name: string): { contents: string; fill: boolean; stroke: boolean } => {
    const svg = fs.readFileSync(`${SVG_PATH}/${name}.svg`).toString()
    // eslint-disable-next-line import/no-named-as-default-member -- build error if fixed
    const [svgData] = (parseSvg.parse(svg).children as unknown) as [
        {
            properties: { [prop: string]: string }
            children: [{ tagName: string }]
        }
    ]
    const children = svgData.children.filter((child) => child.tagName !== 'title') as any
    return {
        contents: toHtml(children),
        fill: svgData.properties.fill !== 'none',
        stroke:
            svgData.properties.stroke !== 'none' &&
            typeof svgData.properties.stroke !== 'undefined',
    }
}

const createIconBaseHtml = (name: string, svgContents: string, fill: boolean, stroke: boolean) => {
    return `
    <div class='flex items-center justify-center flex-grow h-32'>
        <div class='flex flex-col items-center'>
            <svg role="img" viewBox="0 0 24 24" height='24' width='24' fill='${
                fill ? 'currentColor' : 'none'
            }' stroke='${
        stroke ? 'currentColor' : 'none'
    }' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' shape-rendering='geometricPrecision' xmlns="http://www.w3.org/2000/svg"><title>${name.replace(
        '-',
        ' '
    )} icon</title>${svgContents}</svg>
            <p class='!font-sans text-foreground !m-0 !mt-2'>${name}</p>
        </div>
    </div>`
}

const createFeatherHtml = (name: string) => {
    return createIconBaseHtml(name, feather.icons[name].contents, false, true)
}

const createCustomIconHtml = (name: string) => {
    const iconData = getCustomIconData(name)
    return createIconBaseHtml(name, iconData.contents, iconData.fill, iconData.stroke)
}

const createIconHtml = (iconName: IconName) => {
    if (iconName.feather) return createFeatherHtml(iconName.name)

    return createCustomIconHtml(iconName.name)
}

export const generateIconsDocs = (): void => {
    let contents = fs.readFileSync(`${TEMPLATE_LOCATION}/icons.stories.mdx`).toString()
    const iconNames = getIconNames()
    const html = iconNames.map((icon) => createIconHtml(icon)).join('')
    contents = contents.replace('INSERT ICONS HERE', html)
    fs.writeFileSync('src/style-guide/icons.stories.mdx', contents)
}
