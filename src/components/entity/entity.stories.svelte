<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import EntityField from './entity-field/entity-field.svelte'
    import GitHub from '../../elements/icon/github.svelte'

    import Entity from './entity.svelte'

    const meta = {
        title: 'Components/Entity',
        component: Entity,
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
    <Entity {...args}>
        <EntityField title="Title">description</EntityField>
        <EntityField title="Title">description</EntityField>
        <EntityField title="Title" />
        <EntityField right title="Title">
            description
            <svelte:fragment slot="avatar">
                <GitHub />
            </svelte:fragment>
        </EntityField>
    </Entity>
</Template>

<Story name="Default" parameters="{{ jest: ['entity.test.ts'] }}" />
<Story name="Footer" parameters="{{ jest: ['entity.test.ts'] }}" let:args>
    <Entity {...args}>
        <EntityField title="Title">description</EntityField>
        <EntityField title="Title">description</EntityField>
        <EntityField title="Title" />
        <EntityField right title="Title">
            description
            <svelte:fragment slot="avatar">
                <GitHub />
            </svelte:fragment>
        </EntityField>
        <svelte:fragment slot="footer">Hello world, this is the footer</svelte:fragment>
    </Entity>
</Story>
<Story name="Multiple entities" parameters="{{ jest: ['entity.test.ts'] }}" let:args>
    <Entity {...args}>
        <EntityField title="Title">description</EntityField>
        <EntityField title="Title">description</EntityField>
        <EntityField right>Updated one hour ago</EntityField>
    </Entity>
    <Entity {...args}>
        <EntityField title="Title">description</EntityField>
        <EntityField title="Title">description</EntityField>
        <EntityField right />
    </Entity>
</Story>
