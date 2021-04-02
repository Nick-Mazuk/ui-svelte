import { render } from '@testing-library/svelte'

import Http500 from './http-500.svelte'

it('renders without crashing', () => {
    const { container } = render(Http500)
    expect(container).not.toBeEmptyDOMElement()
})
