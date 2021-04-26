<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import ListItem from './list-item/list-item.svelte'
    import List from './list.svelte'
    import Home from '../../elements/icon/home.svelte'
    import Settings from '../../elements/icon/settings.svelte'
    import Edit from '../../elements/icon/edit.svelte'
    import Info from '../../elements/icon/info.svelte'
    import ListDivider from './list-divider/list-divider.svelte'

    const meta = {
        title: 'Components/List',
        component: List,
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
    <List {...args}>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
    </List>
</Template>

<Story name="Default" parameters="{{ jest: ['list.test.ts'] }}" />
<Story name="Leading icon" parameters="{{ jest: ['list.test.ts'] }}" let:args>
    <List {...args}>
        <ListItem>
            <Home slot="prefix" />
            Home
        </ListItem>
        <ListItem>
            <Edit slot="prefix" />
            Posts
        </ListItem>
        <ListItem>
            <Settings slot="prefix" />
            Settings
        </ListItem>
    </List>
</Story>
<Story name="Trailing icon" parameters="{{ jest: ['list.test.ts'] }}" let:args>
    <List {...args}>
        <ListItem>
            Home
            <Info slot="suffix" />
        </ListItem>
        <ListItem>
            Posts
            <Info slot="suffix" />
        </ListItem>
        <ListItem>
            Settings
            <Info slot="suffix" />
        </ListItem>
    </List>
</Story>
<Story name="Divider" parameters="{{ jest: ['list.test.ts'] }}" let:args>
    <List {...args}>
        <ListItem>
            <Home slot="prefix" />
            Home
        </ListItem>
        <ListItem>
            <Edit slot="prefix" />
            Posts
        </ListItem>
        <ListDivider />
        <ListItem>
            <Settings slot="prefix" />
            Settings
        </ListItem>
    </List>
</Story>
