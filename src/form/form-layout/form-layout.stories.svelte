<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import FormLayout from './form-layout.svelte'

    const meta = {
        title: 'Form/FormLayout',
        component: FormLayout,
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
    <FormLayout {...args} />
</Story>
