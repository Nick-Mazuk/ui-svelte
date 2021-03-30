import { render } from '@testing-library/svelte'

import TableOfContents from './table-of-contents.svelte'

it('renders without crashing', () => {
    const { container } = render(TableOfContents)
    expect(container).not.toBeEmptyDOMElement()
})
