<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import DarkModeSelect from './dark-mode-select.svelte'

    import { writable } from 'svelte/store'

    const store = writable('system')

    const meta = {
        title: 'Elements/DarkModeSelect',
        component: DarkModeSelect,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            store: {
                type: { name: 'store', required: true },
            },
            size: {
                control: { type: 'inline-radio', options: ['small', 'default', 'large'] },
                defaultValue: 'default',
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <DarkModeSelect {...args} store="{store}" />
</Template>

<Story name="Default" />
