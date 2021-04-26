import { render } from '@testing-library/svelte'

import MenuItem from './menu-item.svelte'

it('renders without crashing', () => {
    const { container } = render(MenuItem)
    expect(container).not.toBeEmptyDOMElement()
})
