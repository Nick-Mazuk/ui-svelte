<script lang="ts">
    import TextContent from '../../typography/text-content/text-content.svelte'
    import Spacer from '../../utilities/spacer/spacer.svelte'
    import Button from '../../elements/button/button.svelte'
    import Plus from '../../elements/icon/plus.svelte'
    import CheckCircle from '../../elements/icon/check-circle.svelte'
    import MessageCircle from '../../elements/icon/message-circle.svelte'
    import Bell from '../../elements/icon/bell.svelte'

    import type { ChangelogItems, ChangelogItemVariant } from '.'
    import { format } from 'date-fns'
    import { createEventDispatcher } from 'svelte'
    import { slugify } from '@nick-mazuk/lib/esm/text-styling'

    export let title = 'Changelog'
    export let description = ''
    export let showLoadMore = false
    export let showReachedEnd = false
    export let isLoading = false
    export let items: ChangelogItems
    export let hrefPrefix = ''

    const dispatch = createEventDispatcher()

    const formatDate = (date: Date) => {
        return format(date, 'MMM d, YYY')
    }

    const createItemUrl = (slug: string): string => {
        return `${hrefPrefix}/${slug}`
    }

    const VARIANT_MAP: Record<ChangelogItemVariant, { class: string; icon: unknown }> = {
        feature: {
            class: 'bg-primary',
            icon: Plus,
        },
        bug: {
            class: 'bg-error',
            icon: CheckCircle,
        },
        announcement: {
            class: 'bg-highlight',
            icon: MessageCircle,
        },
        improvement: {
            class: 'bg-primary',
            icon: Plus,
        },
    }

</script>

<main id="main-content">
    <div class="border-b py-12">
        <div class="wrapper">
            <h1 class="h2">{title}</h1>
            {#if description}
                <Spacer y="{0.5}" />
                <p class="text-lg text-gray-700">{description}</p>
            {/if}
        </div>
    </div>
    <div class="wrapper">
        {#if $$slots.subscribe}
            <div class="relative py-8 lg:ml-64">
                <p class="text-lg transform lg:translate-y-1">
                    <slot name="subscribe" />
                </p>
                <div class="absolute top-12 bottom-0 border-l-2 -ml-20 lg:block"></div>
                <div class="absolute hidden lg:flex -left-24 top-8 transform translate-x-px">
                    <div
                        class="relative w-8 h-8 flex items-center justify-center bg-foreground rounded-full text-background"
                    >
                        <Bell size="{5}" />
                    </div>
                </div>
            </div>
        {/if}
        {#each items as item, index (item.publishedAt)}
            <article
                class="relative py-16 lg:ml-64"
                class:border-t="{index !== 0 || $$slots.subscribe}"
            >
                <div
                    class="absolute bottom-0 border-l-2 -ml-20 lg:block"
                    class:-top-px="{index !== 0 || $$slots.subscribe}"
                    class:top-20="{index === 0 && !$$slots.subscribe}"
                ></div>
                <div
                    class="absolute hidden lg:flex space-x-8 top-16 right-full w-64 justify-end items-center mr-16 transform translate-x-px"
                >
                    <p class="text-lg text-gray">
                        <a href="{createItemUrl(item.slug)}">
                            {formatDate(item.publishedAt)}
                        </a>
                    </p>

                    <div
                        class="relative w-8 h-8 flex items-center justify-center {VARIANT_MAP[
                            item.variant
                        ].class} rounded-full text-background dark:text-foreground"
                    >
                        <svelte:component this="{VARIANT_MAP[item.variant].icon}" size="{5}" />
                    </div>
                </div>
                <div class="lg:hidden">
                    <p class="text-lg text-gray">
                        <a href="{createItemUrl(item.slug)}">
                            {formatDate(item.publishedAt)}
                        </a>
                    </p>
                    <Spacer />
                </div>
                <div class="aspect-w-16 aspect-h-9 rounded-2xl shadow-lg overflow-hidden">
                    <a href="{createItemUrl(item.slug)}">
                        <picture>
                            {#if item.image.srcSet}
                                {#each item.image.srcSet as source (source.src)}
                                    <source
                                        srcSet="{source.src}"
                                        media="{source.media}"
                                        type="{source.type}"
                                        sizes="{source.sizes}"
                                    />
                                {/each}
                            {/if}
                            {#if item.image.src}
                                <source srcSet="{item.image.src}" />
                            {/if}
                            <img
                                alt=""
                                class="object-cover w-full h-full"
                                width="{item.image.width}"
                                height="{item.image.height}"
                                loading="{index === 0 ? 'eager' : 'lazy'}"
                            />
                        </picture>
                    </a>
                </div>
                <Spacer y="{2}" />
                <h2 class="h4">
                    <a href="{createItemUrl(item.slug)}">
                        {item.title}
                    </a>
                </h2>
                <Spacer />
                <TextContent>
                    {@html item.contents}
                </TextContent>
            </article>
        {/each}
        {#if showLoadMore || showReachedEnd}
            <div class="relative py-16 border-t lg:ml-64">
                <div class="absolute -top-px bottom-0 border-l-2 -ml-20 lg:block"></div>
                <div class="flex justify-center">
                    {#if showLoadMore}
                        <Button
                            variant="secondary"
                            loading="{isLoading}"
                            on:click="{() => dispatch('loadMore')}">Load more</Button
                        >
                    {:else}
                        <p class="text-gray-700">You've reached the end</p>
                    {/if}
                </div>
            </div>
        {/if}
    </div>
</main>
