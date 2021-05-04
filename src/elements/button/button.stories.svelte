<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import Button from './button.svelte'
    import ArrowUp from '../icon/arrow-up.svelte'

    const meta = {
        title: 'Elements/Button',
        component: Button,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
            actions: {
                argTypesRegex: '^on:*',
            },
        },
        argTypes: {
            variant: {
                control: {
                    type: 'select',
                    options: [
                        'primary',
                        'error',
                        'success',
                        'warning',
                        'gray',
                        'highlight',
                        'secondary',
                        'link',
                        'static',
                    ],
                },
                defaultValue: 'primary',
            },
            size: {
                control: {
                    type: 'radio',
                    options: ['small', 'default', 'large'],
                },
                defaultValue: 'default',
            },
            shape: {
                control: {
                    type: 'radio',
                    options: ['none', 'square', 'circle'],
                },
                defaultValue: 'none',
            },
            shadow: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            disabled: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            loading: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            width: {
                control: {
                    type: 'text',
                },
                description: 'Width in Tailwind units, or `full` for 100%',
            },
            href: {
                control: {
                    type: 'text',
                },
            },
            submit: {
                control: {
                    type: 'boolean',
                },
                description: 'Sets `type="submit"`',
            },
            ariaLabel: {
                control: {
                    type: 'text',
                },
                description: "Make icon buttons accessible by labeling it's function",
            },

            'on:click': {
                action: 'clicked',
                description: 'The forwarded on:click DOM event',
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <Button {...args}>Click me</Button>
</Template>

<Story name="Default" />
<Story name="Variants" let:args>
    <div class="flex space-x-8">
        <div><Button {...args} variant="primary">Primary</Button></div>
        <div><Button {...args} variant="gray">Gray</Button></div>
        <div><Button {...args} variant="error">Error</Button></div>
        <div><Button {...args} variant="warning">Warning</Button></div>
        <div><Button {...args} variant="success">Success</Button></div>
        <div><Button {...args} variant="highlight">Highlight</Button></div>
        <div><Button {...args} variant="secondary">Secondary</Button></div>
        <div><Button {...args} variant="link">Link</Button></div>
        <div><Button {...args} variant="static">Static</Button></div>
    </div>
</Story>
<Story name="Hovered" parameters="{{ pseudo: { hover: true } }}" let:args>
    <div class="flex space-x-8">
        <div><Button {...args} variant="primary">Primary</Button></div>
        <div><Button {...args} variant="gray">Gray</Button></div>
        <div><Button {...args} variant="error">Error</Button></div>
        <div><Button {...args} variant="warning">Warning</Button></div>
        <div><Button {...args} variant="success">Success</Button></div>
        <div><Button {...args} variant="highlight">Highlight</Button></div>
        <div><Button {...args} variant="secondary">Secondary</Button></div>
        <div><Button {...args} variant="link">Link</Button></div>
        <div><Button {...args} variant="static">Static</Button></div>
    </div>
</Story>
<Story name="Focused" parameters="{{ pseudo: { focus: true } }}" let:args>
    <div class="flex space-x-8">
        <div><Button {...args} variant="primary">Primary</Button></div>
        <div><Button {...args} variant="gray">Gray</Button></div>
        <div><Button {...args} variant="error">Error</Button></div>
        <div><Button {...args} variant="warning">Warning</Button></div>
        <div><Button {...args} variant="success">Success</Button></div>
        <div><Button {...args} variant="highlight">Highlight</Button></div>
        <div><Button {...args} variant="secondary">Secondary</Button></div>
        <div><Button {...args} variant="link">Link</Button></div>
        <div><Button {...args} variant="static">Static</Button></div>
    </div>
</Story>
<Story name="Sizes" let:args>
    <div class="flex space-x-8">
        <div><Button {...args} size="small">Click me</Button></div>
        <div><Button {...args}>Click me</Button></div>
        <div><Button {...args} size="large">Click me</Button></div>
    </div>
</Story>
<Story name="Shapes" let:args>
    <div class="flex space-x-8">
        <div>
            <Button {...args} size="small" shape="square" ariaLabel="Arrow up"><ArrowUp /></Button>
        </div>
        <div><Button {...args} shape="square" ariaLabel="Arrow up"><ArrowUp /></Button></div>
        <div>
            <Button {...args} size="large" shape="square" ariaLabel="Arrow up"><ArrowUp /></Button>
        </div>
        <div>
            <Button {...args} size="small" shape="circle" ariaLabel="Arrow up"><ArrowUp /></Button>
        </div>
        <div><Button {...args} shape="circle" ariaLabel="Arrow up"><ArrowUp /></Button></div>
        <div>
            <Button {...args} size="large" shape="circle" ariaLabel="Arrow up"><ArrowUp /></Button>
        </div>
    </div>
</Story>
<Story name="Width" let:args>
    <div class="grid gap-8">
        <div><Button {...args} width="{32}">Width 32</Button></div>
        <div><Button {...args} width="{64}">Width 64</Button></div>
        <div><Button {...args} width="full">Width full</Button></div>
    </div>
</Story>
<Story name="Prefix/Suffix" let:args>
    <div class="flex space-x-8">
        <div>
            <Button {...args}>
                <ArrowUp slot="prefix" />
                Prefix
            </Button>
        </div>
        <div>
            <Button {...args}>
                Suffix
                <ArrowUp slot="suffix" />
            </Button>
        </div>
        <div>
            <Button {...args}>
                <ArrowUp slot="prefix" />
                Prefix and suffix
                <ArrowUp slot="suffix" />
            </Button>
        </div>
    </div>
</Story>
<Story name="Disabled" args="{{ disabled: true }}" let:args>
    <Button {...args}>I'm disabled</Button>
</Story>
<Story name="Loading" args="{{ loading: true }}" let:args>
    <Button {...args}>I'm loading</Button>
</Story>
