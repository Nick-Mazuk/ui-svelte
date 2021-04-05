import { render } from '@testing-library/svelte'

import LoadingDots from './loading-dots.svelte'

it('renders without crashing', () => {
    const { container } = render(LoadingDots)
    expect(container).not.toBeEmptyDOMElement()
})
