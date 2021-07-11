<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Accordion from '../accordion.svelte'

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
    <AccordionGroup {...args}>
        <Accordion title="Question A">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil,
                id cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae
                iure nam nemo quibusdam doloremque porro!
            </p>
        </Accordion>
        <Accordion title="Question B">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil,
                id cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae
                iure nam nemo quibusdam doloremque porro!
            </p>
        </Accordion>
        <Accordion title="Question C">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil,
                id cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae
                iure nam nemo quibusdam doloremque porro!
            </p>
        </Accordion>
    </AccordionGroup>
</Story>
<Story name="Default expanded" let:args>
    <AccordionGroup {...args}>
        <Accordion title="Question A" defaultExpanded>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil,
                id cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae
                iure nam nemo quibusdam doloremque porro!
            </p>
        </Accordion>
        <Accordion title="Question B">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil,
                id cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae
                iure nam nemo quibusdam doloremque porro!
            </p>
        </Accordion>
        <Accordion title="Question C">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil,
                id cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae
                iure nam nemo quibusdam doloremque porro!
            </p>
        </Accordion>
    </AccordionGroup>
</Story>
