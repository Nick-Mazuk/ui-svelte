import { render } from '@testing-library/svelte'

import Select from './select.svelte'

it('renders without crashing', () => {
    const { container } = render(Select)
    expect(container).not.toBeEmptyDOMElement()
})
