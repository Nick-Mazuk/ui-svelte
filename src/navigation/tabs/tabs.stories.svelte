<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import TabItem from './tab-item/tab-item.svelte'
    import CheckCircle from '../../elements/icon/check-circle.svelte'

    import Tabs from './tabs.svelte'

    const meta = {
        title: 'Navigation/Tabs',
        component: Tabs,
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
            activeIndex: {
                control: {
                    type: 'number',
                },
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <Tabs {...args}>
        <TabItem>Item 1</TabItem>
        <TabItem>Item 2</TabItem>
        <TabItem>Item 3</TabItem>
    </Tabs>
</Story>

<Story name="Disabled" args="{{ disabled: true }}" let:args>
    <Tabs {...args}>
        <TabItem>Item 1</TabItem>
        <TabItem>Item 2</TabItem>
        <TabItem>Item 3</TabItem>
    </Tabs>
</Story>

<Story name="With icons" let:args>
    <Tabs {...args}>
        <TabItem>
            <CheckCircle slot="icon" />
            Item 1
        </TabItem>
        <TabItem>
            <CheckCircle slot="icon" />
            Item 2
        </TabItem>
        <TabItem>
            <CheckCircle slot="icon" />
            Item 3
        </TabItem>
    </Tabs>
</Story>
