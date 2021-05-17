<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import FileInput from './file-input.svelte'

    const meta = {
        title: 'Form/Inputs/FileInput',
        component: FileInput,
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
    <FileInput {...args} />
</Story>
