import { render } from '@testing-library/svelte'

import Portal from './portal.svelte'

it('renders without crashing', () => {
    const { container } = render(Portal)
    expect(container).not.toBeEmptyDOMElement()
})
