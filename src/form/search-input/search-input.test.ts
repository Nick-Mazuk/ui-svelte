import { render } from '@testing-library/svelte'

import SearchInput from './search-input.svelte'

it('renders without crashing', () => {
    const { container } = render(SearchInput)
    expect(container).not.toBeEmptyDOMElement()
})
