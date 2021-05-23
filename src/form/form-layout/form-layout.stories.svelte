<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Button from '../../elements/button/button.svelte'
    import TextInput from '../inputs/text-input/text-input.svelte'

    import FormLayout from './form-layout.svelte'

    const meta = {
        title: 'Form/FormLayout',
        component: FormLayout,
        parameters: {
            docs: {
                description: {
                    component:
                        'A wrapper component to provide consisten vertical spacing for forms, even if inputs have errors, feedback, or help text.',
                },
            },
        },
        argTypes: {},
    }

</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <FormLayout {...args}>
        <TextInput label="Input 1" />
        <TextInput label="Input 2" helpText="This is some help text" />
        <TextInput label="Input 3" maxCharacters="{32}" />
        <TextInput label="Input 4" optional />
        <TextInput label="Input 5" readonly />
        <div class="flex justify-end">
            <Button submit>Submit</Button>
        </div>
    </FormLayout>
</Story>
