<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import EntityField from './entity-field.svelte'
    import User from '../../../elements/icon/user.svelte'

    const meta = {
        title: 'Components/Entity/EntityField',
        component: EntityField,
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

<Template let:args>
    <EntityField {...args} title="Title">
        Description
        <svelte:fragment slot="avatar">
            <User />
        </svelte:fragment>
    </EntityField>
</Template>

<Story name="Default" parameters="{{ jest: ['entity-field.test.ts'] }}" />
