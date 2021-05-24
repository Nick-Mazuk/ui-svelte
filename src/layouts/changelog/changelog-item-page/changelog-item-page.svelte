<script lang="ts">
    import Button from '../../../elements/button/button.svelte'

    import { format } from 'date-fns'
    import Spacer from '../../../utilities/spacer/spacer.svelte'
    import type { ChangelogImage } from '..'

    export let title: string
    export let publishedAt: Date
    export let image: ChangelogImage | undefined = undefined
    export let content: string
    export let backHref: string
    export let backText = 'Back to changelog'
</script>

<main id="main-content">
    <div class="relative py-8 border-b">
        <div class="wrapper !max-w-2xl w-full">
            <Button variant="static" glue="{['left', 'top', 'bottom']}" href="{backHref}">
                <span class="text-gray-700 font-normal">← {backText}</span>
            </Button>
            <Spacer />
            <h1 class="h3 text-balance">{title}</h1>
            <Spacer y="{0.5}" />
            <p class="text-gray">{format(publishedAt, 'eeee MMM do, YYY')}</p>
        </div>
    </div>

    <section class="wrapper !max-w-2xl mx-auto">
        {#if typeof image !== 'undefined'}
            <div class="aspect-w-16 aspect-h-9 rounded-2xl shadow-lg overflow-hidden my-6">
                <picture>
                    {#if image.srcSet}
                        {#each image.srcSet as source (source.src)}
                            <source
                                srcSet="{source.src}"
                                media="{source.media}"
                                type="{source.type}"
                                sizes="{source.sizes}"
                            />
                        {/each}
                    {/if}
                    {#if image.src}
                        <source srcSet="{image.src}" />
                    {/if}
                    <img
                        alt=""
                        class="object-cover w-full h-full"
                        width="{image.width}"
                        height="{image.height}"
                    />
                </picture>
            </div>
        {/if}
        <div class="wrapper prose !max-w-2xl mx-auto my-8">
            {@html content}
        </div>
    </section>
</main>
