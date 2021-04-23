<script lang="ts">
    import FooterSection from './footer-section/footer-section.svelte'
</script>

<section class="bg-gray-50 text-gray dark:border-t mt-auto">
    <div class="wrapper py-8">
        <slot />

        {#if $$slots['copyright'] || $$slots['social-links'] || $$slots['theme-toggle']}
            <FooterSection>
                {#if $$slots['copyright']}
                    <p class="text-sm whitespace-nowrap">
                        <slot name="copyright" />
                    </p>
                {/if}
                {#if $$slots['social-links']}
                    <div class="flex space-x-4">
                        <slot name="social-links" />
                    </div>
                {/if}
                {#if $$slots['theme-toggle']}
                    <div class="w-32">
                        <slot name="theme-toggle" />
                    </div>
                {/if}
            </FooterSection>
        {/if}
    </div>
</section>
