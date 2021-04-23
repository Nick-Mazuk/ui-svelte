import { render } from '@testing-library/svelte'

import Button from './button.svelte'

it('renders without crashing', () => {
    const { container } = render(Button)
    expect(container).not.toBeEmptyDOMElement()
})
