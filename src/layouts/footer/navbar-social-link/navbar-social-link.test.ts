import { render } from '@testing-library/svelte'

import NavbarSocialLink from './navbar-social-link.svelte'

it('renders without crashing', () => {
    const { container } = render(NavbarSocialLink)
    expect(container).not.toBeEmptyDOMElement()
})
