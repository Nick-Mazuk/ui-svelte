<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Modal from '../../../components/modal/modal.svelte'
    import Button from '../../../elements/button/button.svelte'
    import Form from '../../form/form.svelte'
    import UrlInput from '../url-input/url-input.svelte'

    import RichTextInput from './rich-text-input.svelte'

    const meta = {
        title: 'Form/Inputs/RichTextInput',
        component: RichTextInput,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            h1: {
                control: {
                    type: 'select',
                    options: [1, 2, 3, 4, true, false],
                },
                description:
                    'Whether to allow headers or not. Use a number for a specific header (e.g, 3 means `<h3>`) or a boolean for `<h1>`. False will disallow a large header.',
                defaultValue: false,
            },
            h2: {
                control: {
                    type: 'select',
                    options: [1, 2, 3, 4, true, false],
                },
                description:
                    'Whether to allow headers or not. Use a number for a specific header (e.g, 3 means `<h3>`) or a boolean for `<h2>`. False will disallow a small header.',
                defaultValue: false,
            },
            b: {
                control: 'boolean',
                defaultValue: false,
            },
            i: {
                control: 'boolean',
                defaultValue: false,
            },
            ol: {
                control: 'boolean',
                defaultValue: false,
            },
            ul: {
                control: 'boolean',
                defaultValue: false,
            },
            a: {
                control: 'boolean',
                defaultValue: false,
            },
            blockquote: {
                control: 'boolean',
                defaultValue: false,
            },
            code: {
                control: 'boolean',
                defaultValue: false,
            },
            img: {
                control: 'boolean',
                defaultValue: false,
                description:
                    "Will allow you to use images. Note: because images often require file uploads (which is specific to every site), you'll need to impliment the upload modal.",
            },
            label: {
                control: {
                    type: 'text',
                },
                defaultValue: 'Rich text',
            },
            size: {
                control: {
                    type: 'radio',
                    options: ['small', 'default', 'large'],
                },
                defaultValue: 'default',
            },
            disabled: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            readonly: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            optional: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            hideOptionalLabel: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            maxCharacters: {
                control: {
                    type: 'number',
                },
                description:
                    'Specify the maximum number of characters that must be included for the input to be valid. This will automatically give the user feedback as they type.',
            },
        },
    }

</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <RichTextInput {...args}>
        <svelte:fragment slot="add-image-modal" let:addImageToText let:onModalClose>
            <Modal title="Add image" isOpen on:close="{onModalClose}" refocusOnClose="{false}">
                <Form
                    handleSubmit="{(data) => {
                        const url = data['image-url']
                        if (typeof url === 'string') addImageToText(url)
                        return Promise.resolve(true)
                    }}"
                >
                    <UrlInput label="Image url" autofocus optional hideOptionalLabel />
                    <div class="mt-4 flex justify-end space-x-4">
                        <Button submit>Upload</Button>
                    </div>
                </Form>
            </Modal>
        </svelte:fragment>
    </RichTextInput>
</Story>
<Story
    name="All enabled"
    args="{{
        h1: true,
        h2: true,
        b: true,
        i: true,
        ol: true,
        ul: true,
        a: true,
        blockquote: true,
        code: true,
        img: true,
    }}"
    let:args
>
    <RichTextInput {...args}>
        <svelte:fragment slot="add-image-modal" let:addImageToText let:onModalClose>
            <Modal title="Add image" isOpen on:close="{onModalClose}" refocusOnClose="{false}">
                <Form
                    handleSubmit="{(data) => {
                        const url = data['image-url']
                        if (typeof url === 'string') addImageToText(url)
                        return Promise.resolve(true)
                    }}"
                >
                    <UrlInput label="Image url" autofocus optional hideOptionalLabel />
                    <div class="mt-4 flex justify-end space-x-4">
                        <Button submit>Upload</Button>
                    </div>
                </Form>
            </Modal>
        </svelte:fragment>
    </RichTextInput>
</Story>
