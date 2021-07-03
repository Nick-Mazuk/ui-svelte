<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import ChangelogItemPage from './changelog-item-page.svelte'

    const meta = {
        title: 'Layouts/Changelog/ChangelogItemPage',
        component: ChangelogItemPage,
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
                defaultValue: 'Changelog item title',
            },
            publishedAt: {
                control: 'date',
                defaultValue: new Date('may 21, 2021'),
            },
            image: {
                control: 'object',
                defaultValue: {
                    src: 'https://placeimg.com/800/450/technics',
                },
            },
            content: {
                control: 'text',
                defaultValue: `<p>There are some great updates to the site:</p>

                    <ul>
                        <li>Update 1</li>
                        <li>Update 2</li>
                        <li>Update 3</li>
                    </ul>
                    <p>
                        To view these updates, make sure to go visit the appropriate page that's
                        definitely linked right here.
                    </p>`,
            },
            backHref: {
                control: 'text',
                defaultValue: '#',
            },
            backText: {
                control: 'text',
                defaultValue: 'Back to changelog',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <ChangelogItemPage {...args} />
</Story>
