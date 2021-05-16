<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Button from '../../elements/button/button.svelte'
    import Modal from './modal.svelte'

    const meta = {
        title: 'Components/Modal',
        component: Modal,
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
            cancelText: {
                control: 'text',
                defaultValue: 'Cancel',
            },
            size: {
                control: {
                    type: 'select',
                    options: ['small', 'default', 'large'],
                },
                defaultValue: 'default',
            },
            variant: {
                control: {
                    type: 'inline-radio',
                    options: ['default', 'success'],
                },
                defaultValue: 'default',
            },
        },
    }

    let isOpen = false

</script>

<Meta {...meta} />

<Story name="Default" args="{{ description: 'Would you like to continue?' }}" let:args>
    <Button variant="secondary" on:click="{() => (isOpen = true)}">Open modal</Button>
    <Modal {...args} bind:isOpen on:confirm="{() => (isOpen = false)}">
        This is the contents of the modal.
    </Modal>
</Story>

<Story
    name="Success"
    args="{{
        variant: 'success',
        title: 'Payment successful',
        description:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed vel eum cumque, eos quis reprehenderit?',
        confirmText: 'View music',
        cancelText: '',
        size: 'small',
    }}"
    let:args
>
    <Button variant="secondary" on:click="{() => (isOpen = true)}">Open modal</Button>
    <Modal {...args} bind:isOpen on:confirm="{() => (isOpen = false)}" />
</Story>
