import { render } from '@testing-library/svelte'

import ListDivider from './list-divider.svelte'

it('renders without crashing', () => {
    const { container } = render(ListDivider)
    expect(container).not.toBeEmptyDOMElement()
})
