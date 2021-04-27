import { render } from '@testing-library/svelte'

import HeaderLink from './header-link.svelte'

it('renders without crashing', () => {
    const { container } = render(HeaderLink)
    expect(container).not.toBeEmptyDOMElement()
})
