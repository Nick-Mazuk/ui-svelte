<script lang="ts">
    import SectionTitle from '../section-title.svelte'

    export let title: string
</script>

<section>
    <SectionTitle title="{title.charAt(0).toUpperCase() + title.slice(1)}" />
    <div class="border rounded-lg overflow-hidden -mx-3 md:-mx-6">
        <slot />
    </div>
</section>
