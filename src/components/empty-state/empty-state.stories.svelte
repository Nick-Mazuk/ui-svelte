<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Button from '../../elements/button/button.svelte'
    import Container from '../../utilities/container/container.svelte'

    import EmptyState from './empty-state.svelte'

    const meta = {
        title: 'Components/EmptyState',
        component: EmptyState,
        parameters: {
            docs: {
                description: {
                    component:
                        "Empty states should follow [GitHub's design guidelines](https://primer.style/design/ui-patterns/empty-states).",
                },
            },
        },
        argTypes: {
            title: {
                control: 'text',
                defaultValue: 'This is an empty state',
            },
            description: {
                control: 'text',
                defaultValue:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum aliquid et exercitationem totam magnam eaque alias provident, distinctio doloremque obcaecati veritatis dolore? Quod, quos atque ratione nulla sed optio. Possimus?',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <EmptyState {...args}>
        <svelte:fragment slot="cta">
            <Button variant="secondary">Learn more</Button>
            <Button>Call to action</Button>
        </svelte:fragment>
    </EmptyState>
</Story>

<Story name="Inside container" let:args>
    <Container variant="fill">
        <EmptyState {...args}>
            <svelte:fragment slot="cta">
                <Button>Call to action</Button>
            </svelte:fragment>
        </EmptyState>
    </Container>
</Story>
