import { render } from '@testing-library/svelte'

import FooterSocialContainer from './footer-social-link-container.svelte'

it('renders without crashing', () => {
    const { container } = render(FooterSocialContainer)
    expect(container).not.toBeEmptyDOMElement()
})
