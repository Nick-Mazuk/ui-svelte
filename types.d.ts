declare module '@storybook/addon-svelte-csf'
declare module 'marked/lib/marked.esm'
declare module 'zxcvbn/dist/zxcvbn'

declare namespace Cypress {
    interface Chainable {
        loadStory(
            component: string,
            story: string,
            knobs?: { [knob: string]: string }
        ): Chainable<Element>
        tab(): Chainable<Element>
        toggleDarkMode(): Chainable<Element>
        checkAccessibility(): Chainable<Element>
        goOffline(): Chainable<Element>
        goOnline(): Chainable<Element>
        screenSize(size: 'tiny' | 'sm' | 'md' | 'lg'): Chainable<Element>
    }
}

type ColorSpace = 'rgb' | 'hex' | 'hsl' | 'xyz' | 'lab' | 'lchab' | 'luv' | 'lchuv'

declare module 'ac-colors' {
    // eslint-disable-next-line import/no-default-export -- don't want to deal with it
    export default class Color {
        constructor(color: {
            color: string | [number, number, number]
            type?: ColorSpace
            precision?: number
            capitalize?: boolean
        })

        capitalize: boolean

        precision: number

        rgb: [number, number, number]

        rgbString: string

        hex: string

        hexString: string

        hsl: [number, number, number]

        hslString: string

        xyz: [number, number, number]

        xyzString: string

        lab: [number, number, number]

        labString: string

        lchab: [number, number, number]

        lchabString: string

        luv: [number, number, number]

        luvString: string

        lchuv: [number, number, number]

        lchuvString: string

        static contrastRatio: (colorA: Color, colorB: Color) => number

        static rgbToHsl: (color: [number, number, number]) => [number, number, number]

        static hslToRgb: (color: [number, number, number]) => [number, number, number]

        static rgbToHex: (color: [number, number, number]) => string

        static hexToRgb: (color: string) => [number, number, number]

        static rgbToXyz: (color: [number, number, number]) => [number, number, number]

        static xyzToRgb: (color: [number, number, number]) => [number, number, number]

        static xyzToLab: (color: [number, number, number]) => [number, number, number]

        static labToXyz: (color: [number, number, number]) => [number, number, number]

        static labToLCHab: (color: [number, number, number]) => [number, number, number]

        static lchABToLab: (color: [number, number, number]) => [number, number, number]

        static xyzToLuv: (color: [number, number, number]) => [number, number, number]

        static luvToXyz: (color: [number, number, number]) => [number, number, number]

        static luvToLCHuv: (color: [number, number, number]) => [number, number, number]

        static lchUVToLuv: (color: [number, number, number]) => [number, number, number]

        static luminance: (color: string | [number, number, number], type?: ColorSpace) => number

        static random: () => Color

        static randomFromString: (string: string) => Color

        static randomOfType: (type?: ColorSpace) => Color

        static randomOfTypeFormatted: (
            type?: ColorSpace,
            capitalize?: boolean,
            precision?: number
        ) => string

        static contrastTextColor: (
            color: string | [number, number, number],
            type?: ColorSpace
        ) => '#FFFFFF' | '#000000'

        static contrastRatio: (colorA: Color, colorB: Color) => number

        static blend: (colorA: Color, colorB: Color, type?: ColorSpace, weight: number) => Color
    }
}
