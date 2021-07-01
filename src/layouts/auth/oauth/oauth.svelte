<script lang="ts">
    import Button from '../../../elements/button/button.svelte'
    import Google from '../../../elements/icon/google.svelte'
    import Facebook from '../../../elements/icon/facebook.svelte'
    import Twitter from '../../../elements/icon/twitter.svelte'
    import Apple from '../../../elements/icon/apple.svelte'
    import Spacer from '../../../utilities/spacer/spacer.svelte'
    import type { OauthDispatcher } from '.'
    import { createEventDispatcher } from 'svelte'

    export let apple = false
    export let facebook = false
    export let google = false
    export let twitter = false

    const dispatch = createEventDispatcher<OauthDispatcher>()
</script>

<h1 class="h4 text-center">Sign in</h1>
<Spacer />
<div class="grid gap-3 grid-flow-row">
    {#if apple}
        <Button
            prefix="{Apple}"
            size="large"
            width="full"
            variant="secondary"
            on:click="{() => dispatch('click', 'apple')}"
        >
            Continue with Apple
        </Button>
    {/if}
    {#if facebook}
        <Button
            prefix="{Facebook}"
            size="large"
            width="full"
            variant="secondary"
            on:click="{() => dispatch('click', 'facebook')}"
        >
            Continue with Facebook
        </Button>
    {/if}
    {#if google}
        <Button
            prefix="{Google}"
            size="large"
            width="full"
            variant="secondary"
            on:click="{() => dispatch('click', 'google')}"
        >
            Continue with Google
        </Button>
    {/if}
    {#if twitter}
        <Button
            prefix="{Twitter}"
            size="large"
            width="full"
            variant="secondary"
            on:click="{() => dispatch('click', 'twitter')}"
        >
            Continue with Twitter
        </Button>
    {/if}
</div>
