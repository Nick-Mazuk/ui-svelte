<script lang="ts">
    import IntersectionObserver from 'svelte-intersection-observer'
    import { setContext } from 'svelte'
    import { writable } from 'svelte/store'
    import Button from '../../elements/button/button.svelte'
    import type { HeaderContext } from '.'

    export let sticky = false
    export let small = false
    export let page = ''

    let scrolledToTop = true
    let sentinal: HTMLElement
    let mobileOpen = false

    const pageStore = writable(page)
    setContext<HeaderContext>('headerContext', { currentPage: pageStore })

    if (typeof window !== 'undefined')
        window.addEventListener('sveltekit:navigation-end', () => (mobileOpen = false))

    $: stickyClasses = sticky ? 'sticky top-0 overflow-visible' : 'relative'
    $: pageStore.set(page)
    $: borderClasses =
        !sticky || scrolledToTop ? 'border-b' : 'border-b border-background dark:border-gray-200'

</script>

<header
    class="z-50 {stickyClasses} bg-background border-b isolate {borderClasses}"
    style="transform:translateZ(10000px)"
>
    <a
        class="absolute top-2 left-8 border border-gray-50 transform -translate-y-96 font-semibold z-50 px-4 py-3 select-none bg-background rounded-lg shadow-lg focus:translate-y-0 focus:outline-none dark:shadow-none dark:border dark:bg-gray-200"
        href="#main-content"
    >
        Jump to content
    </a>

    {#if sticky}
        <div
            class="absolute w-full h-full shadow-lg dark:shadow-none pointer-events-none select-none block transition-opacity {scrolledToTop
                ? 'opacity-0'
                : 'opacity-100'}"
        ></div>
    {/if}
    <nav class="flex wrapper space-x-4 {small ? 'h-12' : 'h-16'}">
        <div class="flex space-x-4 flex-grow">
            <slot name="left" />
        </div>
        <div class="flex space-x-4 justify-center">
            <slot name="center" />
        </div>
        <div class="flex space-x-4 ml-auto justify-end flex-grow">
            <slot name="right" />
            {#if $$slots.mobile}
                <div class="flex items-center sm:hidden">
                    <Button
                        ariaLabel="{mobileOpen ? 'Close menu' : 'Open menu'}"
                        variant="static"
                        shape="square"
                        testId="header-hamburger"
                        on:click="{() => (mobileOpen = !mobileOpen)}"
                    >
                        <div>
                            <div
                                class="border-t border-foreground w-5 transform transition-transform"
                                class:-translate-y-1="{!mobileOpen}"
                                class:translate-y-px="{mobileOpen}"
                                class:rotate-45="{mobileOpen}"
                            ></div>
                            <div
                                class="border-t border-foreground w-5 transform transition-transform"
                                class:translate-y-1="{!mobileOpen}"
                                class:-rotate-45="{mobileOpen}"
                            ></div>
                        </div>
                    </Button>
                </div>
            {/if}
        </div>
    </nav>

    <nav class="h-12 wrapper flex space-x-4 overflow-x-scroll">
        <p class="whitespace-nowrap">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quia modi quisquam illo
            consectetur aliquam, dolorem eum, maiores fugiat placeat, veniam nobis tempore delectus
            consequuntur labore nostrum excepturi recusandae? Odio.
        </p>
    </nav>
</header>
<IntersectionObserver element="{sentinal}" bind:intersecting="{scrolledToTop}">
    <div bind:this="{sentinal}" class="h-1 w-full absolute top-0 z-50"></div>
</IntersectionObserver>

{#if mobileOpen && $$slots.mobile}
    <nav
        class="fixed z-50 w-screen h-screen bg-background border-t overflow-scroll text-lg sm:hidden"
        class:pb-16="{!small}"
        class:pb-12="{small}"
        class:top-16="{!small}"
        class:top-12="{small}"
        style="transform:translateZ(9999px)"
        data-test="mobile-nav"
        aria-label="mobile navigation"
    >
        <slot name="mobile" />
    </nav>
{/if}

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
