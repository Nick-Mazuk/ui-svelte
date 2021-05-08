<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import CheckInput from './check-input.svelte'
    import Spacer from '../../../utilities/spacer/spacer.svelte'
    import Mail from '../../../elements/icon/mail.svelte'
    import Error from '../../../elements/error/error.svelte'
    import Button from '../../../elements/button/button.svelte'

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
    <p class="font-bold mb-1">Label</p>
    <div class="input-wrapper flex group items-center h-10">
        <div class="pl-3 pr-2">
            <Mail size="{5}" />
        </div>
        <input
            type="text"
            value="Some text content"
            class="p-0 border-none text-base focus:ring-0 w-full self-stretch"
        />
    </div>
    <div class="mt-1">
        <Error>Required</Error>
    </div>
    <Spacer />
    <p class="font-bold mb-1">Label</p>
    <input
        type="text"
        value="Some text content"
        class="bg-background px-3 h-10 w-full text-base rounded border-gray-300 text-gray-700 hover:text-gray-900 focus:text-gray-900 cursor-pointer hover:border-foreground focus:border-primary ring-gray hover:ring-foreground focus:ring-primary transition"
    />
    <div class="mt-1">
        <Error>Required</Error>
    </div>
    <Spacer />
    <Button>
        Send email
        <Mail slot="prefix" />
    </Button>

    <Spacer />
    <CheckInput label="Label" {...args}>I agree to the terms and privacy policy.</CheckInput>
    <Spacer />
    <CheckInput {...args} value="checked">I agree to the terms and privacy policy.</CheckInput>
    <Spacer />
    <CheckInput {...args} value="indeterminate">
        I agree to the terms and privacy policy.
    </CheckInput>
</Story>
