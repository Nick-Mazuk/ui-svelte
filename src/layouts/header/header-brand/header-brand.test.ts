import { render } from '@testing-library/svelte'

import HeaderBrand from './header-brand.svelte'

it('renders without crashing', () => {
    const { container } = render(HeaderBrand)
    expect(container).not.toBeEmptyDOMElement()
})
