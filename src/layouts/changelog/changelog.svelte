<script lang="ts">
    import Spacer from '../../utilities/spacer/spacer.svelte'
    import Button from '../../elements/button/button.svelte'
    import Plus from '../../elements/icon/plus.svelte'
    import CheckCircle from '../../elements/icon/check-circle.svelte'
    import ChevronRight from '../../elements/icon/chevron-right.svelte'
    import MessageCircle from '../../elements/icon/message-circle.svelte'
    import Bell from '../../elements/icon/bell.svelte'

    import type { ChangelogItems, ChangelogItemVariant } from '.'
    import { format } from 'date-fns'
    import { createEventDispatcher } from 'svelte'

    export let title = 'Changelog'
    export let description = ''
    export let showLoadMore = false
    export let showReachedEnd = false
    export let showReadMore = false
    export let isLoading = false
    export let items: ChangelogItems
    export let hrefPrefix: string | undefined = undefined

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
            <div class="relative h-20 flex items-center lg:ml-64">
                <p class="text-lg">
                    <slot name="subscribe" />
                </p>
                <div class="absolute top-12 bottom-0 border-l-2 -ml-20 lg:block"></div>
                <div
                    class="absolute hidden lg:flex -left-24 top-1/2 transform translate-x-px -translate-y-1/2"
                >
                    <div
                        class="relative w-8 h-8 flex items-center justify-center bg-foreground rounded-full text-background"
                    >
                        <Bell size="{5}" />
                    </div>
                </div>
            </div>
        {/if}
        {#each items as item, index (item.publishedAt)}
            <div style="content-visibility: auto; content-intrinsic-size: 1px 600px">
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
                            {#if typeof hrefPrefix === 'undefined'}
                                {formatDate(item.publishedAt)}
                            {:else}
                                <a href="{createItemUrl(item.slug)}" title="View post {item.title}">
                                    {formatDate(item.publishedAt)}
                                </a>
                            {/if}
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
                            {#if typeof hrefPrefix === 'undefined'}
                                {formatDate(item.publishedAt)}
                            {:else}
                                <a href="{createItemUrl(item.slug)}" title="View post {item.title}">
                                    {formatDate(item.publishedAt)}
                                </a>
                            {/if}
                        </p>
                        <Spacer />
                    </div>
                    <div class="aspect-w-16 aspect-h-9 rounded-2xl shadow-lg overflow-hidden">
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
                    </div>
                    <Spacer y="{2}" />
                    <h2 class="h4">
                        {#if typeof hrefPrefix === 'undefined'}
                            {item.title}
                        {:else}
                            <a href="{createItemUrl(item.slug)}" title="View post {item.title}">
                                {item.title}
                            </a>
                        {/if}
                    </h2>
                    <Spacer />
                    <div class="prose">
                        {@html item.contents}
                    </div>
                    {#if showReadMore && typeof hrefPrefix !== 'undefined'}
                        <Spacer />
                        <Button suffix="{ChevronRight}" href="{createItemUrl(item.slug)}">
                            Read more
                        </Button>
                    {/if}
                </article>
            </div>
        {/each}
        {#if showLoadMore || showReachedEnd}
            <div style="content-visibility: auto; content-intrinsic-size: 1px 168px">
                <div class="relative py-16 border-t lg:ml-64">
                    <div class="absolute -top-px bottom-0 border-l-2 -ml-20 lg:block"></div>
                    <div class="flex justify-center">
                        {#if showReachedEnd}
                            <p class="text-gray-700">You've reached the end</p>
                        {:else}
                            <Button
                                variant="secondary"
                                loading="{isLoading}"
                                on:click="{() => dispatch('loadMore')}"
                            >
                                Load more
                            </Button>
                        {/if}
                    </div>
                </div>
            </div>
        {/if}
    </div>
</main>
