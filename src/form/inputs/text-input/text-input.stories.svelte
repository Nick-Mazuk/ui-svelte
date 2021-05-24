<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import {
        isNumber,
        formatNumber,
        addThousandsSeparators,
        stringToNumber,
    } from '@nick-mazuk/lib/esm/number-styling'

    import Mail from '../../../elements/icon/mail.svelte'
    import Eye from '../../../elements/icon/eye.svelte'
    import Lock from '../../../elements/icon/lock.svelte'
    import TextInput from './text-input.svelte'
    import Form from '../../form/form.svelte'
    import Button from '../../../elements/button/button.svelte'

    const meta = {
        title: 'Form/Inputs/TextInput',
        component: TextInput,
        parameters: {
            docs: {
                description: {
                    component: 'A flexible text input component.',
                },
            },
        },
        argTypes: {
            label: {
                control: {
                    type: 'text',
                },
                defaultValue: 'Label',
            },
            name: {
                control: {
                    type: 'text',
                },
            },
            type: {
                control: {
                    type: 'select',
                    options: ['text', 'email', 'number', 'password', 'search', 'textarea', 'url'],
                },
                defaultValue: 'text',
            },
            size: {
                control: {
                    type: 'inline-radio',
                    options: ['small', 'default', 'large'],
                },
                defaultValue: 'default',
            },
            disabled: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            readonly: {
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
            placeholder: {
                control: {
                    type: 'text',
                },
            },
            defaultValue: {
                control: {
                    type: 'text',
                },
            },
            prefix: {
                control: {
                    type: 'string',
                },
                description: 'A string or icon to appear at the start of the input.',
            },
            prefixButton: {
                description:
                    'Make the prefix respond to click events. This is an object that includes a `label` of type string and an `onClick` method that will be called when the prefix is clicked.',
            },
            suffix: {
                control: {
                    type: 'string',
                },
                description: 'A string or icon to appear at the end of the input.',
            },
            suffixButton: {
                description:
                    'Make the suffix respond to click events. This is an object that includes a `label` of type string and an `onClick` method that will be called when the suffix is clicked.',
            },
            textRight: {
                control: {
                    type: 'boolean',
                },
                description:
                    'Aligns the text to the right. Equivalent to using the `text-right` Tailwind class.',
            },
            helpText: {
                control: {
                    type: 'string',
                },
                description: "Give the user more details they'll need to fill out the input",
            },
            feedback: {
                control: {
                    type: 'string',
                },
                description:
                    'For providing feedback as the user types. For instance, this can be used for showing the current character count.',
            },
            hideFeedback: {
                control: 'boolean',
                description:
                    "Hide the feedback. Useful if you need to limit the character count but don't want to display the current count. Use sparingly.",
            },
            requiredMessage: {
                control: {
                    type: 'string',
                },
                description:
                    'If the input is not optional, this error message will show when the input is blank.',
            },
            validationRules: {
                description:
                    'Rules that will run to validate user input client-side. This is an array of objects, where each object contains `assert: (value: string) => boolean` (a function that validates the input) and `error: string` (error message to show when the rule fails).',
            },
            updater: {
                description:
                    'A function that will run on every input keystroke. Use this for formatting the text in real-time or for limiting input to certain characters. `(value: string, oldValue: string) => string`',
            },
            formatter: {
                description:
                    'A function that formats the value when the input is blurred. `(value: string) => string`',
            },
            parser: {
                description:
                    'A function that will parse the visible user input into the final value that will be submitted in the form. Useful for parsing things like numbers with thousands separators. `(value: string) => FormDataValue`',
            },
            tabularNums: {
                control: {
                    type: 'boolean',
                },
                description: 'For making all number characters equal width.',
            },
            keyboard: {
                control: {
                    type: 'select',
                    options: ['decimal', 'none', 'email', 'numeric', 'search', 'tel', 'url'],
                },
                description: 'Specify which virtual keyboard should be shown on mobile devices.',
            },
            autocomplete: {
                control: {
                    type: 'text',
                },
                description:
                    "The HTML autocomplete value for the input. For instance, it's usefull letting the browser auto-fill usernames and passwords.",
            },
            minCharacters: {
                control: {
                    type: 'number',
                },
                description:
                    'Specify the minimum number of characters that must be included for the input to be valid. This will automatically give the user feedback as they type.',
            },
            maxCharacters: {
                control: {
                    type: 'number',
                },
                description:
                    'Specify the maximum number of characters that must be included for the input to be valid. This will automatically give the user feedback as they type.',
            },
            autofocus: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
        },
    }

    let formatterValue = '150.00'
    let formatterParsedValue = '150'

</script>

<Meta {...meta} />

<Story name="Default" args="{{ label: 'Label' }}" let:args>
    <TextInput {...args} />
</Story>
<Story name="Anatomy" let:args>
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
</Story>
<Story name="Prefix and suffix" args="{{ optional: true, hideOptionalLabel: true }}" let:args>
    <div class="form-layout">
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
    <div class="form-layout">
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
    </div>
</Story>
<Story name="Sizes" args="{{ optional: true, hideOptionalLabel: true }}" let:args>
    <div class="form-layout">
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
</Story>
<Story name="Formatters" args="{{ optional: true, hideOptionalLabel: true }}" let:args>
    <div class="form-layout">
        <TextInput
            {...args}
            label="Number"
            defaultValue="150.00"
            updater="{(number, oldNumber) => {
                if (number === '' || number === '-') return number
                if (isNumber(number)) return addThousandsSeparators(number)

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
    <div class="form-layout">
        <TextInput {...args} label="Upper character limit" maxCharacters="{30}" />
        <TextInput {...args} label="Lower character limit" minCharacters="{8}" />
    </div>
</Story>
<Story
    name="Textarea"
    args="{{
        type: 'textarea',
    }}"
    let:args
>
    <div class="form-layout">
        <TextInput {...args} label="Small" size="small" />
        <TextInput {...args} label="Default" />
        <TextInput {...args} label="Large" size="large" />
    </div>
</Story>
<Story name="With form" let:args>
    <Form handleSubmit="{() => Promise.resolve(true)}" resetOnSubmit>
        <div class="form-layout">
            <TextInput {...args} label="Text input" />
            <div>
                <Button submit>Submit</Button>
            </div>
        </div>
    </Form>
</Story>
