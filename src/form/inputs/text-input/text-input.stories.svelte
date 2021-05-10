<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import {
        isNumber,
        formatNumber,
        truncateDecimals,
        addThousandsSeparators,
        fixedDecimals,
        stringToNumber,
    } from '@nick-mazuk/lib/js/number-styling'

    import Mail from '../../../elements/icon/mail.svelte'
    import Eye from '../../../elements/icon/eye.svelte'
    import Lock from '../../../elements/icon/lock.svelte'
    import TextInput from './text-input.svelte'
    import Button from '../../../elements/button/button.svelte'

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

    let formatterValue = '150.00'
    let formatterParsedValue = '150'
</script>

<Meta {...meta} />

<Story name="Default" args="{{ label: 'Label' }}" let:args>
    <TextInput {...args} />
</Story>
<Story name="Anatomy" let:args>
    <div class="grid grid-cols-1 gap-4">
        <TextInput
            {...args}
            label="Label"
            prefix="Prefix"
            suffix="Suffix"
            helpText="Help text"
            placeholder="Placeholder"
            feedback="Feedback"
            optional
        />
    </div>
</Story>
<Story name="Prefix/Suffix" let:args>
    <div class="grid grid-cols-1 gap-4">
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
    <div class="grid grid-cols-1 gap-4">
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
<Story name="Sizes" let:args>
    <div class="grid grid-cols-1 gap-4">
        <TextInput {...args} label="Small" defaultValue="Some text" size="small" />
        <TextInput {...args} label="Default" defaultValue="Some text" size="default" />
        <TextInput {...args} label="Large" defaultValue="Some text" size="large" />
        <TextInput
            {...args}
            label="Small with icon"
            defaultValue="Some text"
            prefix="{Mail}"
            size="small"
        />
        <TextInput
            {...args}
            label="Default with icon"
            defaultValue="Some text"
            prefix="{Mail}"
            size="default"
        />
        <TextInput
            {...args}
            label="Large with icon"
            defaultValue="Some text"
            prefix="{Mail}"
            size="large"
        />
    </div>
</Story>
<Story name="Validation" let:args>
    <div class="grid grid-cols-1 gap-4">
        <TextInput
            {...args}
            label="Password"
            validationRules="{[
                {
                    assert: (value) => value.length >= 8,
                    error: 'Password must be at least 8 characters',
                },
                {
                    assert: (value) => (value.match(/[A-Z]/gu) || []).length >= 2,
                    error: 'Password must have at least 2 uppercase characters',
                },
                {
                    assert: (value) => (value.match(/[a-z]/gu) || []).length >= 2,
                    error: 'Password must have at least 2 lowercase characters',
                },
                {
                    assert: (value) => (value.match(/\d/gu) || []).length >= 2,
                    error: 'Password must have at least 2 numbers',
                },
            ]}"
        />
    </div>
</Story>
<Story name="Formatters" let:args>
    <div class="grid grid-cols-1 gap-4">
        <TextInput
            {...args}
            label="Number"
            defaultValue="150.00"
            updater="{(number, oldNumber) => {
                if (number === '' || number === '-') return number
                if (isNumber(number)) {
                    let string = addThousandsSeparators(number)
                    return string
                }
                return oldNumber
            }}"
            formatter="{formatNumber}"
            parser="{stringToNumber}"
            on:change="{(event) => {
                formatterValue = event.detail.value
                formatterParsedValue = event.detail.parsedValue
            }}"
        />
        <p>Value: "{formatterValue}"</p>
        <p>Parsed value: "{formatterParsedValue}"</p>
    </div>
</Story>
<Story name="Character limits" let:args>
    <div class="grid grid-cols-1 gap-4">
        <TextInput {...args} label="Upper character limit" maxCharacters="{30}" />
        <TextInput {...args} label="Lower character limit" minCharacters="{8}" />
    </div>
</Story>
