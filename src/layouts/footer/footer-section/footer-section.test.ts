import { render } from '@testing-library/svelte'

import FooterSection from './footer-section.svelte'

it('renders without crashing', () => {
    const { container } = render(FooterSection)
    expect(container).not.toBeEmptyDOMElement()
})
