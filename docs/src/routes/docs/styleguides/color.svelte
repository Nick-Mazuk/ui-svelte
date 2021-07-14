<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'
    import { generateColorsList } from '$lib/lib/colors'

    export const load: Load = async () => {
        return {
            props: { colors: generateColorsList() },
        }
    }
</script>

<script lang="ts">
    import PaletteItem from '$lib/components/docs/color/palette-item.svelte'
    import type { ColorPalettes } from '$lib/lib/colors'

    import Palette from '$lib/components/docs/color/palette.svelte'
    import Header from '$lib/components/docs/header.svelte'

    export let colors: ColorPalettes
</script>

<Header
    title="Color"
    description="An accessible color palette that works in both light and dark mode."
/>

<div class="grid grid-cols-1 gap-12">
    {#each colors as palette}
        <Palette title="{palette.name}">
            {#each palette.items as item}
                <PaletteItem
                    name="{item.name}"
                    hexLight="{item.hexLight}"
                    hexDark="{item.hexDark}"
                    cssVariable="{item.cssVariable}"
                    isDark="{item.isDark}"
                />
            {/each}
        </Palette>
    {/each}
</div>
