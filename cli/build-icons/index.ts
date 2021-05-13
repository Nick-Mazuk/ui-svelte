import feather from 'feather-icons'
import fs from 'fs-extra'
import { toHtml } from 'hast-util-to-html'
import parseSvg from 'svg-parser'

const SVG_PATH = 'src/svg'
const OUTPUT_PATH = 'src/elements/icon'
const TEMPLATE_PATH = 'src/elements/icon/storybook/icon.svelte'
const TEMPLATE_CONTENTS = `<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
    ></path>`

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

const removeOldIcons = () => {
    const currentFiles = fs.readdirSync(OUTPUT_PATH)
    const filesToRemove = currentFiles.filter((name) => name.endsWith('.svelte'))
    filesToRemove.forEach((file) => fs.unlinkSync(`${OUTPUT_PATH}/${file}`))
}

const getTemplateContents = () => {
    return fs.readFileSync(TEMPLATE_PATH).toString()
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

const createIconComponent = ({
    name,
    fill,
    stroke,
    svgContents,
    templateContents,
}: {
    name: string
    fill: boolean
    stroke: boolean
    svgContents: string
    templateContents: string
}) => {
    let contents = templateContents.replace(TEMPLATE_CONTENTS, svgContents)
    if (fill) contents = contents.replace('fill="none"', 'fill="currentColor"')
    if (!stroke) contents = contents.replace('stroke="currentColor"', 'stroke="none"')
    fs.writeFileSync(`${OUTPUT_PATH}/${name}.svelte`, contents)
}

const buildIcons = () => {
    removeOldIcons()
    const customIconNames = getCustomIconNames()
    const featherIconNames = getFeatherIconNames(customIconNames)
    const templateContents = getTemplateContents()
    featherIconNames.forEach((name) => {
        createIconComponent({
            name,
            fill: false,
            stroke: true,
            svgContents: feather.icons[name].contents,
            templateContents,
        })
    })
    customIconNames.forEach((name) => {
        const { contents: svgContents, fill, stroke } = getCustomIconData(name)
        createIconComponent({ name, fill, stroke, svgContents, templateContents })
    })
}

buildIcons()
