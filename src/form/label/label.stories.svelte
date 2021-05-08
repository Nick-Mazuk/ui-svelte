<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import Label from './label.svelte'

    const meta = {
        title: 'Form/Label',
        component: Label,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            value: {
                control: {
                    type: 'text',
                },
                defaultValue: 'Label',
            },
            info: {
                control: {
                    type: 'text',
                },
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <Label {...args} />
</Story>
