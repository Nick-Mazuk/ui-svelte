import { render } from '@testing-library/svelte'

import LoadingSpinner from './loading-spinner.svelte'

it('renders without crashing', () => {
    const { container } = render(LoadingSpinner)
    expect(container).not.toBeEmptyDOMElement()
})
