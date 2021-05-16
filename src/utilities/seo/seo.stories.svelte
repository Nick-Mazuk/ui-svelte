<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Note from '../../elements/note/note.svelte'

    const meta = {
        title: 'Utilities/Seo',
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
    <Note label="Note">This component does not display anything.</Note>
</Story>
