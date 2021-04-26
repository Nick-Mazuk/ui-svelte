<script>
    // todo
    // responsiveness (with breakpoints)
    // menu
    // form
    // disabled
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import EntityField from './entity-field/entity-field.svelte'
    import GitHub from '../../elements/icon/github.svelte'
    import Button from '../../elements/button/button.svelte'

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
<Story name="Prefix" parameters="{{ jest: ['entity.test.ts'] }}" let:args>
    <Entity {...args}>
        <EntityField title="Title">description</EntityField>
        <EntityField title="Title">description</EntityField>
        <EntityField right>Updated one hour ago</EntityField>
        <svelte:fragment slot="prefix">
            <img
                src="https://cdn.fakercloud.com/avatars/bartjo_128.jpg"
                class="w-8 h-8 rounded-full"
                alt="Avatar"
            />
        </svelte:fragment>
        <svelte:fragment slot="actions">
            <Button size="small" variant="secondary">Delete</Button>
            <Button size="small">Edit</Button>
        </svelte:fragment>
    </Entity>
</Story>
<Story name="Actions" parameters="{{ jest: ['entity.test.ts'] }}" let:args>
    <Entity {...args}>
        <EntityField title="Title">description</EntityField>
        <EntityField title="Title">description</EntityField>
        <EntityField right>Updated one hour ago</EntityField>
        <svelte:fragment slot="actions">
            <Button size="small" variant="secondary">Delete</Button>
            <Button size="small">Edit</Button>
        </svelte:fragment>
    </Entity>
</Story>
<Story name="Menu" parameters="{{ jest: ['entity.test.ts'] }}" let:args>
    <Entity {...args}>
        <EntityField title="Title">description</EntityField>
        <EntityField title="Title">description</EntityField>
        <EntityField right>Updated one hour ago</EntityField>
        <svelte:fragment slot="menu">hello</svelte:fragment>
    </Entity>
</Story>
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
        <EntityField right>Updated one hour ago</EntityField>
    </Entity>
    <Entity {...args}>
        <EntityField title="Title">description</EntityField>
        <EntityField title="Title">description</EntityField>
        <EntityField right>Updated one hour ago</EntityField>
    </Entity>
</Story>
