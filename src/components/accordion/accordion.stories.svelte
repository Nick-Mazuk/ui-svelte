<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import Accordion from './accordion.svelte'

    const meta = {
        title: 'Components/Accordion',
        component: Accordion,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            title: {
                control: 'text',
                defaultValue: 'Question A',
            },
            unstyledContents: {
                control: 'boolean',
                defaultValue: false,
                description:
                    "By default, the accordion component assumes it's has text content. Therefore, the text is styled appropriately. However, sometimes this is not the case. In these situations, use this prop.",
            },
            defaultExpanded: {
                control: 'boolean',
                defaultValue: false,
            },
            card: {
                control: 'boolean',
                defaultValue: false,
            },
            size: {
                control: {
                    type: 'inline-radio',
                    options: ['default', 'small'],
                },
                defaultValue: 'default',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <Accordion {...args}>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil, id
            cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae iure nam
            nemo quibusdam doloremque porro!
        </p>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil, id
            cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae iure nam
            nemo quibusdam doloremque porro!
        </p>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil, id
            cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae iure nam
            nemo quibusdam doloremque porro!
        </p>
    </Accordion>
</Story>

<Story name="Expanded" args="{{ defaultExpanded: true }}" let:args>
    <Accordion {...args}>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil, id
            cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae iure nam
            nemo quibusdam doloremque porro!
        </p>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil, id
            cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae iure nam
            nemo quibusdam doloremque porro!
        </p>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil, id
            cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae iure nam
            nemo quibusdam doloremque porro!
        </p>
    </Accordion>
</Story>

<Story name="Card" args="{{ card: true }}" let:args>
    <Accordion {...args}>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil, id
            cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae iure nam
            nemo quibusdam doloremque porro!
        </p>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil, id
            cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae iure nam
            nemo quibusdam doloremque porro!
        </p>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil, id
            cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae iure nam
            nemo quibusdam doloremque porro!
        </p>
    </Accordion>
</Story>

<Story name="Small" args="{{ size: 'small' }}" let:args>
    <Accordion {...args}>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil, id
            cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae iure nam
            nemo quibusdam doloremque porro!
        </p>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil, id
            cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae iure nam
            nemo quibusdam doloremque porro!
        </p>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni officiis nihil, id
            cumque repellat. Cum natus ea provident quaerat ratione. Nesciunt alias, vitae iure nam
            nemo quibusdam doloremque porro!
        </p>
    </Accordion>
</Story>
