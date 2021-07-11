<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Spacer from '../../utilities/spacer/spacer.svelte'

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

<Story name="Variants" args="{{ variant: 'error' }}" let:args>
    <Note {...args} variant="gray">variant: gray</Note>
    <Spacer />
    <Note {...args} variant="primary">variant: primary</Note>
    <Spacer />
    <Note {...args} variant="error">
        Renders with the error component when the variant is error.
    </Note>
    <Spacer />
    <Note {...args} variant="success">variant: success</Note>
    <Spacer />
    <Note {...args} variant="warning">variant: warning</Note>
    <Spacer />
    <Note {...args} variant="highlight">variant: highlight</Note>
    <Spacer />
</Story>
