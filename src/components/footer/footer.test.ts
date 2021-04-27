import { render } from '@testing-library/svelte'

import Footer from './footer.svelte'

it('renders without crashing', () => {
    const { container } = render(Footer)
    expect(container).not.toBeEmptyDOMElement()
})
