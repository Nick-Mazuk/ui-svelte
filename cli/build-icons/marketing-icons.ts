import fs from 'fs-extra'
import { toHtml } from 'hast-util-to-html'
import parseSvg from 'svg-parser'

const SVG_PATH = 'src/svg-marketing'
const OUTPUT_PATH = 'src/elements/marketing-icon'
const TEMPLATE_PATH = 'src/elements/marketing-icon/storybook/marketing-icon.svelte'
const TEMPLATE_CONTENTS = `    <path
        fill="currentColor"
        d="M358.9 433.3l-6.8 61a15.92 15.92 0 0 0 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7zM633 268.9L595.1 231a24 24 0 0 0-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8a24.08 24.08 0 0 0 0-33.9z"
        style="color: {VARIANT_MAP[variant].light}"
    >
    </path>
    <path
        fill="currentColor"
        d="M313.6 288h-16.7a174.08 174.08 0 0 1-145.8 0h-16.7A134.43 134.43 0 0 0 0 422.4V464a48 48 0 0 0 48 48h274.9a48 48 0 0 1-2.6-21.3l6.8-60.9 1.2-11.1 85.2-85.2c-24.5-27.7-60-45.5-99.9-45.5zM224 256A128 128 0 1 0 96 128a128 128 0 0 0 128 128z"
        style="color: {VARIANT_MAP[variant].dark}"
    >
    </path>`

const getIconNames = () => {
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

const getIconData = (name: string): { contents: string; viewBox: string } => {
    const svg = fs.readFileSync(`${SVG_PATH}/${name}.svg`).toString()
    // eslint-disable-next-line import/no-named-as-default-member -- build error if fixed
    const [svgData] = (parseSvg.parse(svg).children as unknown) as [
        {
            properties: { [prop: string]: string }
            children: [{ tagName: string }]
        }
    ]
    const children = svgData.children
        .filter((child) => child.tagName !== 'title')
        .map((child: any) => {
            child.properties.class = 'transition-colors'
            return child
        }) as any
    console.log({ children })
    return {
        contents: toHtml(children),
        viewBox: svgData.properties.viewBox,
    }
}

const createIconComponent = ({
    name,
    viewBox,
    svgContents,
    templateContents,
}: {
    name: string
    viewBox: string
    svgContents: string
    templateContents: string
}) => {
    let contents = templateContents.replace(TEMPLATE_CONTENTS, svgContents)
    contents = contents.replace('viewBox="0 0 640 512"', `viewBox="${viewBox}"`)
    fs.writeFileSync(`${OUTPUT_PATH}/${name}.svelte`, contents)
}

export const buildMarketingIcons = (): void => {
    removeOldIcons()
    const iconNames = getIconNames()
    const templateContents = getTemplateContents()
    iconNames.forEach((name) => {
        const { contents: svgContents, viewBox } = getIconData(name)
        createIconComponent({ name, viewBox, svgContents, templateContents })
    })
}
