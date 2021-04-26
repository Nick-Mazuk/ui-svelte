import { render } from '@testing-library/svelte'

import List from './list.svelte'

it('renders without crashing', () => {
    const { container } = render(List)
    expect(container).not.toBeEmptyDOMElement()
})
