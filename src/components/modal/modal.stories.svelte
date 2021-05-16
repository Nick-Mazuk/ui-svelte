<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

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
                defaultValue: 'horizontal',
            },
        },
    }

</script>

<Meta {...meta} />

<Story name="Default" args="{{ description: 'Would you like to continue?' }}" let:args>
    <Modal {...args}>This is the contents of the modal.</Modal>
</Story>

<Story
    name="Confirm"
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
    <Modal {...args} />
</Story>
