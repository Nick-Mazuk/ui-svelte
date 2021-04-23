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
        },
        argTypes: {
            color: {
                control: {
                    type: 'select',
                    options: ['primary', 'error', 'success', 'warning', 'gray', 'highlight'],
                },
                defaultValue: 'primary',
            },
            variant: {
                control: {
                    type: 'radio',
                    options: ['filled', 'text'],
                },
                defaultValue: 'filled',
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
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <Button {...args}>Click me</Button>
</Template>

<Story name="Default" parameters="{{ jest: ['button.test.ts'] }}" />
<Story name="Colors" parameters="{{ jest: ['button.test.ts'] }}" let:args>
    <div class="flex space-x-8">
        <div><Button {...args} color="primary">Primary</Button></div>
        <div><Button {...args} color="gray">Gray</Button></div>
        <div><Button {...args} color="error">Error</Button></div>
        <div><Button {...args} color="warning">Warning</Button></div>
        <div><Button {...args} color="success">Success</Button></div>
        <div><Button {...args} color="highlight">Highlight</Button></div>
    </div>
</Story>
<Story
    name="Text"
    parameters="{{ jest: ['button.test.ts'] }}"
    args="{{ variant: 'text' }}"
    let:args
>
    <div class="flex space-x-8">
        <div><Button {...args} color="primary">Primary</Button></div>
        <div><Button {...args} color="gray">Gray</Button></div>
        <div><Button {...args} color="error">Error</Button></div>
        <div><Button {...args} color="warning">Warning</Button></div>
        <div><Button {...args} color="success">Success</Button></div>
        <div><Button {...args} color="highlight">Highlight</Button></div>
    </div>
</Story>
<Story name="Sizes" parameters="{{ jest: ['button.test.ts'] }}" let:args>
    <div class="flex space-x-8">
        <div><Button {...args} size="small">Click me</Button></div>
        <div><Button {...args}>Click me</Button></div>
        <div><Button {...args} size="large">Click me</Button></div>
    </div>
</Story>
<Story name="Shapes" parameters="{{ jest: ['button.test.ts'] }}" let:args>
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
<Story name="Width" parameters="{{ jest: ['button.test.ts'] }}" let:args>
    <div class="grid gap-8">
        <div><Button {...args} width="{32}">Width 32</Button></div>
        <div><Button {...args} width="{64}">Width 64</Button></div>
        <div><Button {...args} width="full">Width full</Button></div>
    </div>
</Story>
<Story name="Prefix/Suffix" parameters="{{ jest: ['button.test.ts'] }}" let:args>
    <div class="flex space-x-8">
        <div>
            <Button {...args}>
                <svelte:fragment slot="prefix">
                    <ArrowUp />
                </svelte:fragment>
                Prefix
            </Button>
        </div>
        <div>
            <Button {...args}>
                Suffix
                <svelte:fragment slot="suffix">
                    <ArrowUp />
                </svelte:fragment>
            </Button>
        </div>
        <div>
            <Button {...args}>
                <svelte:fragment slot="prefix">
                    <ArrowUp />
                </svelte:fragment>
                Prefix and suffix
                <svelte:fragment slot="suffix">
                    <ArrowUp />
                </svelte:fragment>
            </Button>
        </div>
    </div>
</Story>
<Story
    name="Disabled"
    parameters="{{ jest: ['button.test.ts'] }}"
    args="{{ disabled: true }}"
    let:args
>
    <Button {...args}>I'm disabled</Button>
</Story>
<Story
    name="Loading"
    parameters="{{ jest: ['button.test.ts'] }}"
    args="{{ loading: true }}"
    let:args
>
    <Button {...args}>I'm loading</Button>
</Story>
