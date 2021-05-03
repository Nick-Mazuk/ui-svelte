<script lang="ts">
    import HeaderMobileItemWrapper from '../header-mobile-item-wrapper/header-mobile-item-wrapper.svelte'

    export let title: string
</script>

<HeaderMobileItemWrapper>
    <p class="text-uppercase text-gray text-sm mt-8">{title}</p>
</HeaderMobileItemWrapper>

<slot />
