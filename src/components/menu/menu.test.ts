import { render } from '@testing-library/svelte'

import Menu from './menu.svelte'

it('renders without crashing', () => {
    const { container } = render(Menu)
    expect(container).not.toBeEmptyDOMElement()
})
