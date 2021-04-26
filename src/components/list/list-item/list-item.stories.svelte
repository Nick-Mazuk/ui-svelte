<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import ListItem from './list-item.svelte'
    import Plus from '../../../elements/icon/plus.svelte'
    import List from '../list.svelte'

    const meta = {
        title: 'Components/List/ListItem',
        component: ListItem,
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
    <List>
        <ListItem {...args}>Hello world</ListItem>
    </List>
</Template>

<Story name="Default" parameters="{{ jest: ['list-item.test.ts'] }}" />
<Story name="Prefix" parameters="{{ jest: ['list-item.test.ts'] }}" let:args>
    <List>
        <ListItem {...args}>
            <svelte:fragment slot="prefix">
                <Plus />
            </svelte:fragment>
            Hello world
        </ListItem>
    </List>
</Story>
<Story name="Suffix" parameters="{{ jest: ['list-item.test.ts'] }}" let:args>
    <List>
        <ListItem {...args}>
            Hello world
            <svelte:fragment slot="suffix">
                <Plus />
            </svelte:fragment>
        </ListItem>
    </List>
</Story>
