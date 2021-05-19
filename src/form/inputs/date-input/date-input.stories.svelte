<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import DateInput from './date-input.svelte'

    const meta = {
        title: 'Form/Inputs/DateInput',
        component: DateInput,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            label: {
                control: {
                    type: 'text',
                },
                defaultValue: 'Date',
            },
            name: {
                control: {
                    type: 'date',
                },
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
            helpText: {
                control: {
                    type: 'string',
                },
                description: "Give the user more details they'll need to fill out the input",
            },
            hideIcon: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            requiredMessage: {
                control: {
                    type: 'string',
                },
                description:
                    'If the input is not optional, this error message will show when the input is blank.',
            },
            autocomplete: {
                control: {
                    type: 'text',
                },
                description:
                    "The HTML autocomplete value for the input. For instance, it's usefull letting the browser auto-fill usernames and passwords.",
            },
            autofocus: {
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
    <DateInput {...args} />
</Story>
