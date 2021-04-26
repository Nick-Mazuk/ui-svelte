import { render } from '@testing-library/svelte'

import Popover from './popover.svelte'

it('renders without crashing', () => {
    const { container } = render(Popover)
    expect(container).not.toBeEmptyDOMElement()
})
