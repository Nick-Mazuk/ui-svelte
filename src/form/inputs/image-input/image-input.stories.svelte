<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import ImageInput from './image-input.svelte'

    const meta = {
        title: 'Form/Inputs/ImageInput',
        component: ImageInput,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            label: {
                control: 'text',
                defaultValue: 'Image',
            },
            name: {
                control: 'text',
                defaultValue: 'image',
            },
            helpText: {
                control: 'text',
                description:
                    'To guide the user on what to upload, for instance, optimal image resolution.',
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
            hideOptionalLabel: {
                control: 'boolean',
            },
            readonly: {
                control: 'boolean',
            },
            disabled: {
                control: 'boolean',
            },
            aspectRatio: {
                control: {
                    type: 'select',
                    options: ['1x1', '4x3', '3x2', '16x9'],
                },
                defaultValue: '3x2',
            },
            hidePreview: {
                control: 'boolean',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <ImageInput {...args} />
</Story>
