import { render } from '@testing-library/svelte'

import ListSection from './list-section.svelte'

it('renders without crashing', () => {
    const { container } = render(ListSection)
    expect(container).not.toBeEmptyDOMElement()
})
