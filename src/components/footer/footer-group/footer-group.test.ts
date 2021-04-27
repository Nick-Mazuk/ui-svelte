import { render } from '@testing-library/svelte'

import FooterGroup from './footer-group.svelte'

it('renders without crashing', () => {
    const { container } = render(FooterGroup)
    expect(container).not.toBeEmptyDOMElement()
})
