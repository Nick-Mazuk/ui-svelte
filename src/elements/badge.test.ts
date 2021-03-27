import { render } from '@testing-library/svelte'

import Badge from './badge.svelte'

it('renders without crashing', () => {
    const { container } = render(Badge)
    expect(container).not.toBeEmptyDOMElement()
})
