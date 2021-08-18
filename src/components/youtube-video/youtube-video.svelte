<script lang="ts">
    export let id: string
    export let title: string
    export let shadow = false

    const srcDoc = `
        <style>
            * {
                padding: 0;
                margin: 0;
                overflow: hidden
            }
            
            html,body {
                height: 100%
            }
            
            img,span {
                position: absolute;
                width: 100%;
                top: 0;
                bottom: 0;
                margin: auto
            }
            
            span {
                height: 1.5em;
                text-align: center;
                font: 48px/1.5 sans-serif;
                color: white;
                text-shadow: 0 0 0.5em black
            }
        </style>
        
        <a href=https://www.youtube.com/embed/${id}?autoplay=1>
            <img
                src='https://i.ytimg.com/vi/${id}/maxresdefault.jpg'
                onload="if (this.naturalWidth === 120) {this.src = this.currentSrc.replace('maxresdefault', 'hqdefault');}"
                alt='${title}'/>
            <span>▶</span>
        </a>`
</script>

<figure class="aspect-w-16 aspect-h-9 overflow-hidden rounded-2xl" class:shadow-2xl="{shadow}">
    <iframe
        src="{`https://www.youtube.com/embed/${id}?autoplay=1?enablejsapi=1`}"
        srcDoc="{srcDoc}"
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        class="w-full h-full object-cover"
        title="{title}"
        loading="lazy"></iframe>
</figure>
