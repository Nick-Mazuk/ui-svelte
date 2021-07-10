<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import AccordionGroup from './accordion-group.svelte'

    const meta = {
        title: 'Components/Accordion/AccordionGroup',
        component: AccordionGroup,
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
    <AccordionGroup {...args} />
</Story>
