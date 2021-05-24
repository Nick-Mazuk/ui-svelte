<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Button from '../../elements/button/button.svelte'
    import Spacer from '../../utilities/spacer/spacer.svelte'
    import { FORM_FEEDBACK } from '../form-feedback'
    import EmailInput from '../inputs/email-input/email-input.svelte'
    import NameInput from '../inputs/name-input/name-input.svelte'
    import PasswordInput from '../inputs/password-input/password-input.svelte'
    import TextInput from '../inputs/text-input/text-input.svelte'

    import FormEntity from './form-entity.svelte'

    const meta = {
        title: 'Form/FormEntity',
        component: FormEntity,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            title: {
                control: 'text',
                defaultValue: 'Form entity',
            },
            description: {
                control: 'text',
            },
            descriptionLink: {
                control: 'object',
            },
            primaryAction: {
                control: 'text',
                defaultValue: 'Save',
            },
            secondaryAction: {
                control: 'text',
            },
            destructiveAction: {
                control: 'text',
            },
            primaryActionSubmit: {
                control: 'boolean',
                defaultValue: true,
                description: 'Determines whether the primary button has `type="submit"`',
            },
            secondaryActionSubmit: {
                control: 'boolean',
                defaultValue: true,
                description: 'Determines whether the secondary button has `type="submit"`',
            },
            destructiveActionSubmit: {
                control: 'boolean',
                defaultValue: true,
                description: 'Determines whether the destructive button has `type="submit"`',
            },
            handleSubmit: {
                description:
                    'A function to handle the submission. Passed directly to the `Form` component.',
            },
            method: {
                description:
                    'The method to submit the form. Not needed if using `handleSubmit`. Passed directly to the `Form` component.',
            },
            action: {
                description:
                    'The url to send the http request to. Not needed if using `handleSubmit`. Passed directly to the `Form` component.',
            },
            resetOnSubmit: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
                description:
                    'Resets all form inputs to their default values after the form is submitted successfully.',
            },
            allowOffline: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
                description:
                    'By default, the form will detect if a user is offline and will throw an error. Use this prop to remove this behavior and allow the user to submit the form without internet access.',
            },
            success: {
                control: {
                    type: 'text',
                },
                defaultValue: FORM_FEEDBACK.success.saved,
            },
            error: {
                control: {
                    type: 'object',
                },
                description:
                    'Error messages to display if the submit fails. Accepts either an object or a string. If `error` is a string, that string will be shown reguardless of the error. If `error` is an object, it replaces any of the default messages. The object can be partial. If any value is set to false, the default error message will be shown instead for that error.',
                defaultValue: {
                    default: FORM_FEEDBACK.errors.default,
                    offline: FORM_FEEDBACK.errors.offline,
                    403: FORM_FEEDBACK.errors[403],
                    429: FORM_FEEDBACK.errors[429],
                    400: FORM_FEEDBACK.errors[400],
                    500: FORM_FEEDBACK.errors[500],
                },
            },
            progress: {
                control: {
                    type: 'range',
                    min: 0,
                    max: 1,
                    step: 0.05,
                },
                description: 'For longer tasks like file uploads, show a progress bar.',
            },
        },
    }

    const handleSubmit = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true)
            }, 500)
        })
    }

</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <FormEntity {...args} handleSubmit="{handleSubmit}">
        <EmailInput defaultValue="hello@exaple.com" />
    </FormEntity>
</Story>
<Story
    name="With description"
    args="{{
        title: 'Your email',
        description: 'Enter the email address you want to use to log in.',
        descriptionLink: { value: 'Learn more', href: '#' },
    }}"
    let:args
>
    <FormEntity {...args}>
        <EmailInput defaultValue="hello@exaple.com" />
    </FormEntity>
</Story>
<Story name="Actions" let:args>
    <div class="grid gap-6">
        <FormEntity
            {...args}
            title="All actions"
            secondaryAction="Discard"
            destructiveAction="Delete"
        >
            <EmailInput defaultValue="hello@exaple.com" />
        </FormEntity>
        <FormEntity
            {...args}
            title="No actions"
            description="Set the primary action to an empty string to remove it"
            primaryAction=""
        >
            <EmailInput defaultValue="hello@exaple.com" />
        </FormEntity>
        <FormEntity
            {...args}
            title="Destructive entity"
            description="Set the primary action to an empty string to remove it"
            primaryAction=""
            destructiveAction="Delete permanently"
        >
            <EmailInput defaultValue="hello@exaple.com" />
        </FormEntity>
        <FormEntity
            {...args}
            title="Extra actions"
            description="These extra actions are just small buttons"
        >
            <svelte:fragment slot="extra-actions">
                <Button variant="secondary" size="small">Edit</Button>
                <Button variant="secondary" size="small">Add</Button>
            </svelte:fragment>
            <EmailInput defaultValue="hello@exaple.com" />
        </FormEntity>
    </div>
</Story>

<Story name="Multiple inputs" let:args>
    <FormEntity {...args} handleSubmit="{handleSubmit}">
        <EmailInput />
        <PasswordInput />
    </FormEntity>
    <Spacer />
    <FormEntity {...args} handleSubmit="{handleSubmit}">
        <div class="form-layout-horizontal form-layout-item">
            <NameInput />
            <EmailInput />
        </div>
        <TextInput label="Subject" />
        <TextInput label="Message" type="textarea" />
    </FormEntity>
</Story>

<Story name="With upload progress" let:args>
    <FormEntity {...args} handleSubmit="{handleSubmit}" progress="{0.5}">
        <EmailInput defaultValue="hello@exaple.com" />
    </FormEntity>
</Story>
