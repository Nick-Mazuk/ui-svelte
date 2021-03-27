import { render } from '@testing-library/svelte'

import LoadingSection from './loading-section.svelte'

it('renders without crashing', () => {
    const { container } = render(LoadingSection)
    expect(container).not.toBeEmptyDOMElement()
})
