import { render } from '@testing-library/svelte'

import Markdown from './markdown.svelte'

it('renders without crashing', () => {
    const { container } = render(Markdown)
    expect(container).not.toBeEmptyDOMElement()
})
