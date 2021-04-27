import { render } from '@testing-library/svelte'

import FooterSocialLink from './footer-social-link.svelte'

it('renders without crashing', () => {
    const { container } = render(FooterSocialLink)
    expect(container).not.toBeEmptyDOMElement()
})
