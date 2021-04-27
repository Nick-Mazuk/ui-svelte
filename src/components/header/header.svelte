<script lang="ts">
    import IntersectionObserver from 'svelte-intersection-observer'

    export let sticky = false
    export let small = false

    let scrolledToTop = true
    let sentinal: HTMLElement

    $: stickyClasses = sticky ? 'sticky top-0 overflow-visible' : 'relative'
</script>

<header
    class="z-50 {stickyClasses} bg-white dark:bg-gray-100 border-b border-gray-100 isolate {scrolledToTop
        ? 'border-opacity-100'
        : 'border-opacity-0 dark:border-opacity-100'}"
    style="transform:translateZ(10000px)"
>
    <a
        class="absolute top-2 left-8 border border-gray-50 transform -translate-y-20 text-semibold z-50 px-4 py-3 select-none bg-white rounded-lg shadow-lg focus:translate-y-0 focus:outline-none dark:shadow-none dark:border dark:bg-gray-200"
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
    <nav class="mx-auto flex wrapper space-x-4 {small ? 'h-12 text-sm' : 'h-16'}">
        <div class="flex space-x-4 flex-grow">
            <slot name="left" />
        </div>
        <div class="flex space-x-4 justify-center">
            <slot name="center" />
        </div>
        <div class="flex space-x-4 ml-auto justify-end flex-grow">
            <slot name="right" />
        </div>
    </nav>
</header>
<IntersectionObserver element="{sentinal}" bind:intersecting="{scrolledToTop}">
    <div bind:this="{sentinal}" class="h-1 w-full absolute top-0 z-50"></div>
</IntersectionObserver>
