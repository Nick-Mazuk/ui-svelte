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
        argTypes: {},
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
