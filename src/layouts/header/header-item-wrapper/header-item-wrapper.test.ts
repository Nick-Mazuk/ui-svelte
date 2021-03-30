import { render } from '@testing-library/svelte'

import HeaderItemWrapper from './header-item-wrapper.svelte'

it('renders without crashing', () => {
    const { container } = render(HeaderItemWrapper)
    expect(container).not.toBeEmptyDOMElement()
})
