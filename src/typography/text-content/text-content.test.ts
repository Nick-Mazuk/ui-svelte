import { render } from '@testing-library/svelte'

import TextContent from './text-content.svelte'

it('renders without crashing', () => {
    const { container } = render(TextContent)
    expect(container).not.toBeEmptyDOMElement()
})
