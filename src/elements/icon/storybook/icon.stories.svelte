<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import Icon from './icon.svelte'

    const meta = {
        title: 'Elements/Icon',
        component: Icon,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            size: {
                control: {
                    type: 'range',
                    min: 4,
                    max: 64,
                    step: 1,
                },
                name: 'size',
                defaultValue: 8,
                description:
                    'Size of the icon. Follows the TailwindCSS size scale, so `size={6}` is equivalent to the class `w-6`.',
                type: { name: 'number', required: false },
            },
            strokeWidth: {
                control: {
                    type: 'number',
                },
                name: 'strokeWidth',
                description: 'Stroke width of the icon in pixels.',
                defaultValue: 1.5,
                type: { name: 'number', required: false },
            },
            color: {
                control: {
                    type: 'string',
                },
                name: 'color',
                description:
                    'Color of the icon. Accepts any of the CSS color variables, e.g., `--c-primary-500`. By default, the icon uses the current text color.',
                type: { name: 'string', required: false },
            },
            align: {
                control: {
                    type: 'select',
                    options: ['top', 'middle', 'bottom', 'default'],
                },
                name: 'align',
                type: { name: 'string', required: false },
            },
            fill: {
                control: 'boolean',
                defaultValue: false,
            },
            stroke: {
                control: 'boolean',
                defaultValue: true,
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <Icon {...args} />
</Template>

<Story name="Default" />
