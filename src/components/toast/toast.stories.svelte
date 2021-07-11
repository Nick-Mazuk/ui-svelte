<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import Toast from './toast.svelte'

    const meta = {
        title: 'Components/Toast',
        component: Toast,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {},
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args parameters="{{ layout: 'fullscreen' }}">
    <div class="dark h-screen w-screen bg-background text-foreground"><Toast {...args} /></div>
</Story>
