<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import SearchInput from './search-input.svelte'

    const meta = {
        title: 'Form/SearchInput',
        component: SearchInput,
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
    <p class="mb-4 max-w-lg py-2 px-3 border rounded leading-tight balance">
        <span class="font-bold">Note</span>: This component is still under active development. It is
        not fully tested or documented, and should not be used in production.
    </p>
    <SearchInput {...args} options="{['hello', 'world']}" />
</Template>

<Story name="Default" parameters="{{ jest: ['search-input.test.ts'] }}" />
