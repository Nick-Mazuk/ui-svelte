<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import CheckInput from './check-input.svelte'
    import Spacer from '../../../utilities/spacer/spacer.svelte'

    const meta = {
        title: 'Form/Inputs/CheckInput',
        component: CheckInput,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            defaultValue: {
                control: {
                    type: 'radio',
                    options: ['unchecked', 'checked', 'indeterminate'],
                },
                defaultValue: 'unchecked',
            },
            value: {
                control: {
                    type: 'radio',
                    options: ['unchecked', 'checked', 'indeterminate'],
                },
                defaultValue: 'unchecked',
            },
            label: {
                control: {
                    type: 'text',
                },
            },
            name: {
                control: {
                    type: 'text',
                },
            },
            ariaLabel: {
                control: {
                    type: 'text',
                },
            },
            disabled: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            optional: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            hideOptionalLabel: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            hideError: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            requiredMessage: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <CheckInput {...args}>I agree to the terms and privacy policy.</CheckInput>
</Story>
<Story name="No text" args="{{ ariaLabel: 'Agree to the terms and privacy policy.' }}" let:args>
    <CheckInput {...args} />
</Story>
<Story name="Overflowing text" let:args>
    <CheckInput {...args}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto eaque deleniti
        incidunt, at, eveniet distinctio nemo totam illum enim nihil, voluptas quos nobis. Dolorem
        deleniti beatae cum aspernatur dignissimos dicta? Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Architecto eaque deleniti incidunt, at, eveniet distinctio nemo totam
        illum enim nihil, voluptas quos nobis. Dolorem deleniti beatae cum aspernatur dignissimos
        dicta?
    </CheckInput>
</Story>
<Story name="Label" args="{{ label: 'Label' }}" let:args>
    <CheckInput {...args}>I agree to the terms and privacy policy.</CheckInput>
</Story>
<Story name="Indeterminate" args="{{ value: 'indeterminate' }}" let:args>
    <CheckInput {...args}>I agree to the terms and privacy policy.</CheckInput>
</Story>
<Story name="Disabled" args="{{ disabled: true }}" let:args>
    <CheckInput {...args}>I agree to the terms and privacy policy.</CheckInput>
    <Spacer />
    <CheckInput {...args} value="checked">I agree to the terms and privacy policy.</CheckInput>
    <Spacer />
    <CheckInput {...args} value="indeterminate">
        I agree to the terms and privacy policy.
    </CheckInput>
</Story>
