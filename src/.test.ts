import { render } from '@testing-library/svelte'

import  from './.svelte'

it('renders without crashing', () => {
    const { container } = render()
    expect(container).not.toBeEmptyDOMElement()
})
