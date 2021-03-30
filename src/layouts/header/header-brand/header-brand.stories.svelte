<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import { text } from 'svelte/internal'

    import HeaderBrand from './header-brand.svelte'

    const meta = {
        title: 'Layouts/Header/HeaderBrand',
        component: HeaderBrand,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            text: {
                control: { type: 'text' },
                defaultValue: 'UI Svelte',
                type: { required: false },
            },
            href: {
                control: { type: 'text' },
                defaultValue: '#',
                type: { required: false },
            },
            image: {
                control: { type: 'text' },
                defaultValue: 'http://placeimg.com/150/150/nature',
                type: { required: false },
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <HeaderBrand {...args} />
</Template>

<Story name="Default" parameters="{{ jest: ['header-brand.test.ts'] }}" />
