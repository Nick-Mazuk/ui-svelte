import { render } from '@testing-library/svelte'

import Entity from './entity.svelte'

it('renders without crashing', () => {
    const { container } = render(Entity)
    expect(container).not.toBeEmptyDOMElement()
})
