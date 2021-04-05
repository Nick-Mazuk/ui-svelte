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
    <p class="mb-4 max-w-lg py-2 px-3 border rounded text-sm leading-tight balance">
        <span class="text-bold">Note</span>: This component is still under active development. It is
        not fully tested or documented, and should not be used in production.
    </p>
    <SearchInput {...args} options="{['hello', 'world']}">
        <svelte:fragment slot="option" let:option>
            <a href="https://google.com">thing {option}</a>
        </svelte:fragment>
    </SearchInput>
</Template>

<Story name="Default" parameters="{{ jest: ['search-input.test.ts'] }}" />
