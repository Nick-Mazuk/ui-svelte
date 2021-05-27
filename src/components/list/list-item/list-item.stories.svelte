<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Badge from '../../../elements/badge/badge.svelte'
    import Info from '../../../elements/icon/info.svelte'
    import Plus from '../../../elements/icon/plus.svelte'
    import Spacer from '../../../utilities/spacer/spacer.svelte'

    import ListItem from './list-item.svelte'

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
        argTypes: {
            variant: {
                control: 'select',
                options: ['gray', 'primary', 'error', 'success', 'warning', 'highlight'],
                defaultValue: 'gray',
            },
            shape: {
                control: 'inline-radio',
                options: ['square', 'rounded'],
                defaultValue: 'square',
            },
        },
    }

</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <ListItem {...args}>List item</ListItem>
</Story>

<Story name="Prefix and suffix" let:args>
    <ListItem {...args} prefixIcon="{Plus}">Prefix icon</ListItem>
    <ListItem {...args} suffixIcon="{Info}">Suffix icon</ListItem>
    <ListItem {...args} prefixIcon="{Plus}" suffixIcon="{Info}">Prefix and suffix icons</ListItem>
    <ListItem {...args}>
        <Badge variant="primary" slot="prefix">1</Badge>
        Custom prefix
    </ListItem>
    <ListItem {...args}>
        Custom suffix
        <Badge variant="primary" slot="suffix">1</Badge>
    </ListItem>
</Story>

<Story name="States" let:args>
    <ListItem {...args} variant="gray">Default</ListItem>
    <ListItem {...args} focused variant="gray">Focused</ListItem>
    <ListItem {...args} selected variant="gray">Selected</ListItem>
</Story>

<Story name="Variants" let:args>
    <h1 class="h4">Variants</h1>
    <Spacer />
    <h2 class="h6">Gray (default)</h2>
    <ListItem {...args} variant="gray">Default</ListItem>
    <ListItem {...args} focused variant="gray">Focused</ListItem>
    <ListItem {...args} selected variant="gray">Selected</ListItem>
    <Spacer />
    <h2 class="h6">Primary</h2>
    <ListItem {...args} variant="primary">Default</ListItem>
    <ListItem {...args} focused variant="primary">Focused</ListItem>
    <ListItem {...args} selected variant="primary">Selected</ListItem>
    <Spacer />
    <h2 class="h6">Error</h2>
    <ListItem {...args} variant="error">Default</ListItem>
    <ListItem {...args} focused variant="error">Focused</ListItem>
    <ListItem {...args} selected variant="error">Selected</ListItem>
    <Spacer />
    <h2 class="h6">Warning</h2>
    <ListItem {...args} variant="warning">Default</ListItem>
    <ListItem {...args} focused variant="warning">Focused</ListItem>
    <ListItem {...args} selected variant="warning">Selected</ListItem>
    <Spacer />
    <h2 class="h6">Success</h2>
    <ListItem {...args} variant="success">Default</ListItem>
    <ListItem {...args} focused variant="success">Focused</ListItem>
    <ListItem {...args} selected variant="success">Selected</ListItem>
    <Spacer />
    <h2 class="h6">Highlight</h2>
    <ListItem {...args} variant="highlight">Default</ListItem>
    <ListItem {...args} focused variant="highlight">Focused</ListItem>
    <ListItem {...args} selected variant="highlight">Selected</ListItem>
</Story>

<Story name="Shapes" let:args>
    <h1 class="h4">Shapes</h1>
    <Spacer />
    <h2 class="h6">Square (default)</h2>
    <ListItem {...args} shape="square">Default</ListItem>
    <ListItem {...args} focused shape="square">Focused</ListItem>
    <ListItem {...args} selected shape="square">Selected</ListItem>
    <Spacer />
    <h2 class="h6">Rounded</h2>
    <ListItem {...args} shape="rounded">Default</ListItem>
    <ListItem {...args} focused shape="rounded">Focused</ListItem>
    <ListItem {...args} selected shape="rounded">Selected</ListItem>
</Story>
