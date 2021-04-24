<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import EntityField from './entity-field/entity-field.svelte'
    import GitHub from '../../elements/icon/github.svelte'

    import Entity from './entity.svelte'

    const meta = {
        title: 'Components/Entity',
        component: Entity,
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

<Template let:args>
    <section class="wrapper">
        <Entity {...args}>
            <EntityField title="Title">description</EntityField>
            <EntityField title="Title">description</EntityField>
            <EntityField title="Title" />
            <EntityField right title="Title">
                description
                <svelte:fragment slot="avatar">
                    <GitHub />
                </svelte:fragment>
            </EntityField>
            <svelte:fragment slot="footer">Hello world, this is the footer</svelte:fragment>
        </Entity>
    </section>
</Template>

<Story name="Default" parameters="{{ jest: ['entity.test.ts'] }}" />
