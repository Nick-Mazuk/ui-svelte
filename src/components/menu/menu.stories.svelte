<script>
    import { Meta, Story } from '@storybook/addon-svelte-csf'
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
        argTypes: {
            placement: {
                control: {
                    type: 'select',
                    options: [
                        'top',
                        'right',
                        'bottom',
                        'left',
                        'top-start',
                        'top-end',
                        'right-start',
                        'right-end',
                        'left-start',
                        'left-end',
                        'bottom-start',
                        'bottom-end',
                    ],
                },
                defaultValue: 'bottom-start',
            },
            loose: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            width: {
                control: {
                    type: 'number',
                },
                defaultValue: 0,
            },
            minWidth: {
                control: {
                    type: 'number',
                },
                defaultValue: 32,
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" parameters="{{ jest: ['menu.test.ts'] }}" let:args>
    <div class="min-w-screen min-h-screen flex items-center justify-center">
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
    </div>
</Story>
