<script lang="ts">
    let classes = ''
    export { classes as class }
</script>

<div class="border-b flex items-end text-lg {classes}">
    <div class="wrapper !mx-0 my-3">
        <slot />
    </div>
</div>
