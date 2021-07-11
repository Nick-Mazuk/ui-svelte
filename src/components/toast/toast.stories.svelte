<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import Toast from './toast.svelte'
    import Button from '../../elements/button/button.svelte'
    import { showToast } from '.'
    import Note from '../../elements/note/note.svelte'

    const meta = {
        title: 'Components/Toast',
        component: Toast,
        parameters: {
            docs: {
                description: {
                    component:
                        'For global or low priority notifications. If a notification can be moved visually closer to the source, you should not use the toast. For instance, toasts should not be used as form confirmations. Use the `Submit` component instead for that.',
                },
            },
        },
        argTypes: {},
    }

    const text = 'Lorem ipsum dolor sit amet consectetur'
    const multilineText =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, perferendis. Fuga in debitis, eaque reiciendis necessitatibus.'
</script>

<Meta {...meta} />

<Story name="Default" let:args parameters="{{ layout: 'fullscreen' }}">
    <div class="grid grid-cols-1 gap-6 wrapper my-6">
        <div>
            <Note>
                This component does not display well in Storybook.
                <a
                    href="/iframe.html?id=components-toast--default&globals=measureEnabled:false&args=&viewMode=story"
                    class="underline"
                    target="_blank"
                    rel="noreferrer"
                >
                    View in fullscreen instead
                </a>
                .
            </Note>
        </div>
        <div>
            <Button on:click="{() => showToast({ text })}">Show toast</Button>
        </div>
        <div>
            <Button on:click="{() => showToast({ text: multilineText })}">Multiline</Button>
        </div>
        <div>
            <Button on:click="{() => showToast({ text, duration: 4 })}">
                Short duration (4 seconds)
            </Button>
        </div>
        <div>
            <Button
                on:click="{() =>
                    showToast({
                        text,
                        action: { text: 'Undo', onClick: () => true },
                    })}"
            >
                With action
            </Button>
        </div>
        <div>
            <Button
                on:click="{() =>
                    showToast({
                        text,
                        cancel: { text: 'Cancel', onClick: () => true },
                    })}"
            >
                With cancel
            </Button>
        </div>
        <div>
            <Button
                on:click="{() =>
                    showToast({
                        text,
                        action: { text: 'Undo', onClick: () => true },
                        cancel: { text: 'Cancel', onClick: () => true },
                    })}"
            >
                With action and cancel
            </Button>
        </div>
        <div>
            <Button
                on:click="{() =>
                    showToast({
                        text,
                        variant: 'success',
                    })}"
            >
                Success
            </Button>
        </div>
        <div>
            <Button
                on:click="{() =>
                    showToast({
                        text,
                        variant: 'error',
                    })}"
            >
                Error
            </Button>
        </div>
    </div>
    <Toast {...args} />
</Story>
