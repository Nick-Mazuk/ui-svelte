<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Button from '../../../elements/button/button.svelte'

    import ModalSuccess from './modal-success.svelte'

    const meta = {
        title: 'Components/Modal/ModalSuccess',
        component: ModalSuccess,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            title: {
                control: 'text',
                defaultValue: 'Title',
            },
            description: {
                control: 'text',
            },
            close: {
                control: 'boolean',
                defaultValue: true,
            },
            isOpen: {
                control: 'boolean',
            },
            confirmText: {
                control: 'text',
                defaultValue: 'Confirm',
            },
        },
    }
    let isOpen = false

</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <ModalSuccess {...args} bind:isOpen on:confirm="{() => (isOpen = false)}" />
    <Button variant="secondary" on:click="{() => (isOpen = true)}">Open modal</Button>
</Story>
