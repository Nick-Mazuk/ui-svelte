<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import TextInput from './text-input.svelte'

    const meta = {
        title: 'Form/Inputs/TextInput',
        component: TextInput,
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
    <TextInput {...args} />
</Story>
