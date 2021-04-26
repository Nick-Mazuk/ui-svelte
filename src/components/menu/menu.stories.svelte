<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import ChevronDown from '../../elements/icon/chevron-down.svelte'
    import Button from '../../elements/button/button.svelte'

    import Menu from './menu.svelte'
    import ListItem from '../list/list-item/list-item.svelte'
    import ListSection from '../list/list-section/list-section.svelte'
    import Home from '../../elements/icon/home.svelte'
    import Edit from '../../elements/icon/edit.svelte'
    import Settings from '../../elements/icon/settings.svelte'

    const meta = {
        title: 'Components/Menu',
        component: Menu,
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

<Story name="Default" parameters="{{ jest: ['menu.test.ts'] }}" let:args>
    <Menu {...args}>
        <Button shape="square" variant="secondary" slot="button" ariaLabel="Open menu">
            <ChevronDown />
        </Button>
        <ListSection title="Dashboard">
            <ListItem>
                <Home slot="prefix" />
                Home
            </ListItem>
            <ListItem>
                <Edit slot="prefix" />
                Posts
            </ListItem>
        </ListSection>
        <ListSection title="Account">
            <ListItem>
                <Settings slot="prefix" />
                Settings
            </ListItem>
        </ListSection>
    </Menu>
</Story>
