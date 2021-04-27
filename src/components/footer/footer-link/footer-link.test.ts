import { render } from '@testing-library/svelte'

import FooterLink from './footer-link.svelte'

it('renders without crashing', () => {
    const { container } = render(FooterLink)
    expect(container).not.toBeEmptyDOMElement()
})
