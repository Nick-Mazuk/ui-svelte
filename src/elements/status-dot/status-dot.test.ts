import { render } from '@testing-library/svelte'

import StatusDot from './status-dot.svelte'

it('renders without crashing', () => {
    const { container } = render(StatusDot)
    expect(container).not.toBeEmptyDOMElement()
})
