<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import HeaderMobileItemWrapper from './header-mobile-item-wrapper.svelte'

    const meta = {
        title: 'Components/Header/HeaderMobileItemWrapper',
        component: HeaderMobileItemWrapper,
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

<Story name="Default" let:args>
    <HeaderMobileItemWrapper {...args} />
</Story>
