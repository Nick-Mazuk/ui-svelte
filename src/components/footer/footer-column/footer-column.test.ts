import { render } from '@testing-library/svelte'

import FooterColumn from './footer-column.svelte'

it('renders without crashing', () => {
    const { container } = render(FooterColumn)
    expect(container).not.toBeEmptyDOMElement()
})
