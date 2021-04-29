<script>
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import HeaderBrand from './header-brand.svelte'

    const meta = {
        title: 'Components/Header/HeaderBrand',
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
            },
            href: {
                control: { type: 'text' },
                defaultValue: '/',
            },
            image: {
                control: { type: 'text' },
            },
            breakpoint: {
                control: {
                    type: 'radio',
                    options: ['sm', 'md', 'none'],
                },
                defaultValue: 'none',
                description:
                    'Only shows the brand text above the breakpoint. Equivalent to using responsive utilities in Tailwind. The image will always be visible.',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" parameters="{{ jest: ['header-brand.test.ts'] }}" let:args>
    <HeaderBrand {...args} />
</Story>
<Story
    name="Image - square"
    parameters="{{ jest: ['header-brand.test.ts'] }}"
    args="{{ image: 'http://placeimg.com/150/150/nature' }}"
    let:args
>
    <HeaderBrand {...args} />
</Story>
<Story
    name="Image - vertical"
    parameters="{{ jest: ['header-brand.test.ts'] }}"
    args="{{ image: 'http://placeimg.com/100/150/nature' }}"
    let:args
>
    <HeaderBrand {...args} />
</Story>
<Story
    name="Image - horizontal"
    parameters="{{ jest: ['header-brand.test.ts'] }}"
    args="{{ image: 'http://placeimg.com/150/100/nature' }}"
    let:args
>
    <HeaderBrand {...args} />
</Story>
<Story
    name="Breakpoints"
    parameters="{{ jest: ['header-brand.test.ts'] }}"
    args="{{ image: 'http://placeimg.com/150/150/nature' }}"
    let:args
>
    <div class="grid grid-flow-row gap-6">
        <HeaderBrand {...args} breakpoint="none" text="breakpoint='none'" />
        <HeaderBrand {...args} breakpoint="sm" text="breakpoint='sm'" />
        <HeaderBrand {...args} breakpoint="md" text="breakpoint='md'" />
    </div>
</Story>
