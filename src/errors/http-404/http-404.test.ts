import { render } from '@testing-library/svelte'

import Http404 from './http-404.svelte'

it('renders without crashing', () => {
    const { container } = render(Http404)
    expect(container).not.toBeEmptyDOMElement()
})
