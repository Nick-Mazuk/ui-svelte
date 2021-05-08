<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import Mail from '../../../elements/icon/mail.svelte'
    import Eye from '../../../elements/icon/eye.svelte'
    import Lock from '../../../elements/icon/lock.svelte'
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

<Story name="Default" args="{{ label: 'Label' }}" let:args>
    <TextInput {...args} />
</Story>
<Story name="Anatomy" let:args>
    <div class="grid grid-cols-1 gap-6">
        <TextInput
            {...args}
            label="Label"
            prefix="Prefix"
            suffix="Suffix"
            helpText="Help text"
            placeholder="Placeholder"
            optional
        />
    </div>
</Story>
<Story name="Prefix/Suffix" let:args>
    <div class="grid grid-cols-1 gap-6">
        <TextInput {...args} label="Prefix" prefix="https://" />
        <TextInput {...args} label="Icon prefix" prefix="{Mail}" />
        <TextInput {...args} label="Suffix" suffix=".com" />
        <TextInput {...args} label="Suffix with right aligned text" textRight suffix="lbs" />
        <TextInput {...args} label="Icon suffix" suffix="{Lock}" />
        <TextInput {...args} label="Prefix and suffix" prefix="{Lock}" suffix="{Eye}" />
        <TextInput
            {...args}
            label="Affix as a button"
            suffix="{Eye}"
            suffixButton="{{
                label: 'Show password',
                onClick: () => alert('toggle show password'),
            }}"
        />
    </div>
</Story>
<Story name="States" let:args>
    <div class="grid grid-cols-1 gap-6">
        <TextInput {...args} label="Active" helpText="Ready for user input" />
        <TextInput
            {...args}
            label="Optional"
            helpText="To mark fields as not required. If a field is not required, remove it if possible."
            optional
        />
        <TextInput
            {...args}
            label="Readonly"
            helpText="Useful if a field is for reference only. Use sparingly."
            readonly
        />
        <TextInput {...args} label="Disabled" helpText="Is not accepting user input." disabled />
        <TextInput
            {...args}
            label="Error"
            helpText="For when the value of the input is not correct."
        />
    </div>
</Story>
