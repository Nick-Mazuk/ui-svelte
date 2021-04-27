<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import HeaderBrand from './header-brand/header-brand.svelte'

    import Header from './header.svelte'

    const meta = {
        title: 'Components/Header',
        component: Header,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            sticky: {
                control: { type: 'boolean' },
                name: 'sticky',
                type: { name: 'boolean', required: false },
            },
            small: {
                control: { type: 'boolean' },
                name: 'small',
                type: { name: 'boolean', required: false },
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <div class="overflow-x-hidden overflow-y-scroll max-h-full fixed w-full">
        <Header {...args}>
            <svelte:fragment slot="left">
                <HeaderBrand text="UI Svelte" />
            </svelte:fragment>
        </Header>
        <div id="main-content"></div>
    </div>
</Template>

<Story name="Default" parameters="{{ jest: ['header.test.ts'] }}" />
<Story name="Sticky" parameters="{{ jest: ['header.test.ts'] }}" args="{{ sticky: true }}" let:args>
    <div class="overflow-x-hidden overflow-y-scroll max-h-full fixed w-full">
        <Header {...args}>
            <svelte:fragment slot="left">
                <HeaderBrand text="UI Svelte" />
            </svelte:fragment>
        </Header>
        <div id="main-content" class="wrapper">
            <div class="h-32 rounded-lg my-4 bg-gray-100"></div>
            <div class="h-32 rounded-lg my-4 bg-gray-100"></div>
            <div class="h-32 rounded-lg my-4 bg-gray-100"></div>
            <div class="h-32 rounded-lg my-4 bg-gray-100"></div>
            <div class="h-32 rounded-lg my-4 bg-gray-100"></div>
            <div class="h-32 rounded-lg my-4 bg-gray-100"></div>
            <div class="h-32 rounded-lg my-4 bg-gray-100"></div>
            <div class="h-32 rounded-lg my-4 bg-gray-100"></div>
        </div>
    </div>
</Story>
