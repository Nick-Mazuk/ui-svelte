<script lang="ts">
    export let size = 1
    export let text = ''

    $: parsedSize = size * 4
</script>

<div class="inline-flex items-center space-x-2">
    {#if text}
        <p class="text-sm">{text}</p>
    {/if}
    <div class="inline-grid grid-cols-3 gap-0.5">
        <span
            class="rounded-full inline-block bg-gray-700 m-0 opacity-10"
            style="width:{parsedSize}px;height:{parsedSize}px"></span>
        <span
            class="rounded-full inline-block bg-gray-700 m-0 opacity-10"
            style="width:{parsedSize}px;height:{parsedSize}px"></span>
        <span
            class="rounded-full inline-block bg-gray-700 m-0 opacity-10"
            style="width:{parsedSize}px;height:{parsedSize}px"></span>
    </div>
</div>

<style>
    @keyframes loading-dots-pulse {
        0% {
            opacity: 0.1;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 0.1;
        }
        100% {
            opacity: 0.1;
        }
    }

    span {
        animation: loading-dots-pulse 1.5s ease-in-out 0s infinite;
    }

    span:nth-child(2) {
        animation-delay: 0.15s;
    }
    span:nth-child(3) {
        animation-delay: 0.3s;
    }
</style>
