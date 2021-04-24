import { render } from '@testing-library/svelte'

import Container from './container.svelte'

it('renders without crashing', () => {
    const { container } = render(Container)
    expect(container).not.toBeEmptyDOMElement()
})
