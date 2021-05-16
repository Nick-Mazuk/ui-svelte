<script lang="ts">
    import { getContext, setContext } from 'svelte'
    import { fly } from 'svelte/transition'

    import type { SubheaderContext } from '.'
    import type { HeaderContext } from '..'

    export let image = ''

    setContext<SubheaderContext>('subheaderContext', true)
    const headerContext = getContext<HeaderContext>('headerContext')
    const stickyStore = headerContext?.sticky
    const scrolledStore = headerContext?.scrolledToTop
    $: sticky = typeof stickyStore !== 'undefined' && $stickyStore
    $: scrolledToTop = typeof scrolledStore !== 'undefined' && $scrolledStore
    $: stickyClasses = sticky ? 'sticky top-0 overflow-visible' : 'relative'
    $: borderClasses =
        !sticky || scrolledToTop ? 'border-b' : 'border-b border-background dark:border-gray-200'
</script>

<div
    class="{stickyClasses} bg-background border-b isolate {borderClasses} z-50 -mt-4"
    style="transform:translateZ(10000px)"
>
    <nav class="overflow-x-scroll">
        <div style="min-width: fit-content">
            <div class="h-12 flex space-x-4 wrapper">
                {#if image}
                    <div
                        class="relative self-stretch overflow-visible transition-all duration-[0.25s] ease-out -mr-4 flex-none"
                        class:w-10="{!scrolledToTop}"
                        class:w-0="{scrolledToTop}"
                    >
                        {#if !scrolledToTop}
                            <img
                                src="{image}"
                                alt=""
                                class="h-6 block absolute left-0 top-3 w-6 min-w-6"
                                transition:fly="{{ y: -32, duration: 250 }}"
                            />
                        {/if}
                    </div>
                {/if}
                <slot />
            </div>
        </div>
    </nav>
    {#if sticky}
        <div
            class="absolute w-full top-0 h-full shadow-lg dark:shadow-none pointer-events-none select-none block transition-opacity {scrolledToTop
                ? 'opacity-0'
                : 'opacity-100'}"
        ></div>
    {/if}
</div>

<style>
    nav::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    nav {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
</style>
