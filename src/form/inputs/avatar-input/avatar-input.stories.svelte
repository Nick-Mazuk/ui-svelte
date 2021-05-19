<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import AvatarInput from './avatar-input.svelte'

    const meta = {
        title: 'Form/Inputs/AvatarInput',
        component: AvatarInput,
        parameters: {
            docs: {
                description: {
                    component:
                        'For uploading avatars. Note: all labels, error messages, etc. must be implimented manually. There are events for every single state, though.',
                },
            },
        },
        argTypes: {
            name: {
                control: 'text',
                defaultValue: 'image',
            },
            maxFileSize: {
                control: 'number',
                description: 'The maximum image size in megabytes',
            },
            requiredMessage: {
                control: 'text',
                defaultValue: 'Select an image to upload',
            },
            optional: {
                control: 'boolean',
            },
            readonly: {
                control: 'boolean',
            },
            disabled: {
                control: 'boolean',
            },
            ariaLabel: {
                conrol: 'text',
                defaultValue: 'Avatar',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <AvatarInput {...args} />
</Story>
