<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import User from '../../elements/icon/user.svelte'

    import Select from './select.svelte'

    const meta = {
        title: 'Form/Select',
        component: Select,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            title: {
                control: { type: 'text' },
                defaultValue: 'Title',
                type: { name: 'string' },
            },
            hideArrow: {
                control: { type: 'boolean' },
                defaultValue: false,
                type: { name: 'boolean' },
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <Select {...args}>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
    </Select>
</Template>

<Story name="Default" />
<Story name="No arrow" args="{{ hideArrow: true }}" />
<Story name="With prefix" let:args>
    <Select {...args}>
        <svelte:fragment slot="prefix">
            <User />
        </svelte:fragment>
        <option>John Smith</option>
        <option>Jane Doe</option>
    </Select>
</Story>
