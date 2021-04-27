import { render } from '@testing-library/svelte'

import Header from './header.svelte'

it('renders without crashing', () => {
    const { container } = render(Header)
    expect(container).not.toBeEmptyDOMElement()
})
