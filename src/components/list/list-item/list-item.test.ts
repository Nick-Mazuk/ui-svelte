import { render } from '@testing-library/svelte'

import ListItem from './list-item.svelte'

it('renders without crashing', () => {
    const { container } = render(ListItem)
    expect(container).not.toBeEmptyDOMElement()
})
