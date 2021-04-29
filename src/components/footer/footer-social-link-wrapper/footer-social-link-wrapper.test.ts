import { render } from '@testing-library/svelte'

import FooterSocialLinkWrapper from './footer-social-link-wrapper.svelte'

it('renders without crashing', () => {
    const { container } = render(FooterSocialLinkWrapper)
    expect(container).not.toBeEmptyDOMElement()
})
