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
                control: 'text',
                defaultValue: 'Label',
            },
            ariaLabel: {
                control: 'text',
                description:
                    "For those rare cases where a label shouldn't be visible, yet needs to exist for screen readers.",
            },
            readonly: {
                control: 'boolean',
            },
            optional: {
                control: 'boolean',
            },
            hideOptionalLabel: {
                control: 'boolean',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <Label {...args} />
</Story>
