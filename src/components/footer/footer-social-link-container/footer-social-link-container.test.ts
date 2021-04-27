import { render } from '@testing-library/svelte'

import FooterSocialLinkContainer from './footer-social-link-container.svelte'

it('renders without crashing', () => {
    const { container } = render(FooterSocialLinkContainer)
    expect(container).not.toBeEmptyDOMElement()
})
