<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    const meta = {
        title: 'Utilities/Seo',
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

<Story name="Default" let:args />
