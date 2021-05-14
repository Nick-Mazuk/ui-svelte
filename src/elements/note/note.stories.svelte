<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import Note from './note.svelte'

    const meta = {
        title: 'Elements/Note',
        component: Note,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            variant: {
                control: {
                    type: 'select',
                    options: ['gray', 'primary', 'error', 'success', 'warning', 'highlight'],
                },
                defaultValue: 'gray',
            },
            label: {
                control: 'text',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <Note {...args}>This is a note. It contains information.</Note>
</Story>

<Story name="Error" args="{{ variant: 'error' }}" let:args>
    <Note {...args}>Renders with the error component when the variant is error.</Note>
</Story>
