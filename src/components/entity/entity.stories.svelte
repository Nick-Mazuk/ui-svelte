<script>
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import EntityField from './entity-field/entity-field.svelte'
    import GitHub from '../../elements/icon/github.svelte'
    import Button from '../../elements/button/button.svelte'

    import Entity from './entity.svelte'
    import ListItem from '../list/list-item/list-item.svelte'

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
        argTypes: {
            disabled: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            wrapPrefix: {
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
    <Entity {...args}>
        <EntityField title="Title">description</EntityField>
        <EntityField title="Title">description</EntityField>
        <EntityField title="Title" />
        <EntityField right title="Title">
            description
            <GitHub slot="avatar" />
        </EntityField>
        <svelte:fragment slot="actions">
            <Button size="small" variant="secondary">Delete</Button>
            <Button size="small">Edit</Button>
        </svelte:fragment>
        <svelte:fragment slot="footer">Hello world, this is the footer</svelte:fragment>
        <svelte:fragment slot="menu">
            <ListItem>hello</ListItem>
            <ListItem>hello</ListItem>
            <ListItem>hello</ListItem>
        </svelte:fragment>
        <svelte:fragment slot="prefix">
            <img
                src="https://cdn.fakercloud.com/avatars/bartjo_128.jpg"
                class="w-8 h-8 rounded-full"
                alt="Avatar"
            />
        </svelte:fragment>
    </Entity>
</Story>
<Story name="Prefix" let:args>
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
<Story name="Actions" let:args>
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
<Story name="Menu" let:args>
    <Entity {...args}>
        <EntityField title="Title">description</EntityField>
        <EntityField title="Title">description</EntityField>
        <EntityField right>Updated one hour ago</EntityField>
        <svelte:fragment slot="menu">
            <ListItem>hello</ListItem>
            <ListItem>hello</ListItem>
            <ListItem>hello</ListItem>
        </svelte:fragment>
    </Entity>
</Story>
<Story name="Footer" let:args>
    <Entity {...args}>
        <EntityField title="Title">description</EntityField>
        <EntityField title="Title">description</EntityField>
        <EntityField title="Title" />
        <EntityField right title="Title">
            description
            <GitHub slot="avatar" />
        </EntityField>
        <svelte:fragment slot="footer">Hello world, this is the footer</svelte:fragment>
    </Entity>
</Story>
<Story name="Multiple entities" let:args>
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
