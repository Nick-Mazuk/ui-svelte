import { render } from '@testing-library/svelte'

import LoadingProgressIndicator from './loading-progress-indicator.svelte'

it('renders without crashing', () => {
    const { container } = render(LoadingProgressIndicator)
    expect(container).not.toBeEmptyDOMElement()
})
