<script lang="ts">
    import { isDark as isDarkStore } from '$lib/stores/dark-mode'

    export let name: string
    export let hexLight: string
    export let hexDark: string
    export let cssVariable: string
    export let isDark: boolean

    let textColor: string

    $: {
        if (name.startsWith('accent') && isDark) textColor = 'white'
        else if (name.startsWith('accent') && !isDark) textColor = 'black'
        else if (isDark) textColor = 'rgb(var(--c-background))'
        else textColor = 'rgb(var(--c-foreground))'
    }
</script>

<div
    class="px-3 md:px-6 py-8 grid grid-cols-1 md:grid-cols-5"
    style="background-color: rgb(var({cssVariable})); color: {textColor};"
>
    <div class="!text-2xl font-bold col-span-2 !font-sans">
        {name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' ')}
    </div>
    <div
        class="!text-base md:!text-lg opacity-60 md:opacity-100 font-semibold col-span-2 !font-sans"
    >
        var({cssVariable})
    </div>
    <div
        class="!text-base md:!text-lg opacity-60 md:opacity-100 font-semibold md:text-right !font-sans"
    >
        {$isDarkStore ? hexDark : hexLight}
    </div>
</div>
