<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Tabs from '../tabs.svelte'
    import GitHub from '../../../elements/icon/github.svelte'
    import TabItem from './tab-item.svelte'

    const meta = {
        title: 'Navigation/Tabs/TabItem',
        component: TabItem,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            active: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
                description: 'Sets the tab to be active by default',
            },
            href: {
                control: {
                    type: 'text',
                },
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <Tabs><TabItem {...args}>Tab item</TabItem></Tabs>
</Story>
<Story name="With icon" let:args>
    <Tabs>
        <TabItem {...args}>
            <GitHub slot="icon" />
            Tab item
        </TabItem>
    </Tabs>
</Story>
